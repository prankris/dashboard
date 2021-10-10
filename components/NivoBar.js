import { ResponsiveBar } from '@nivo/bar'
import fetchJson from '../lib/fetchJson';

function formatDate(d) {
    var month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}

export default function NivoBar({ mapdata, selectedDate, setLinear, setFileName, setRows1, setVisible }) {
    return (
        <ResponsiveBar
            data={mapdata}
            keys={['0-30 Days', "31-60 Days", "61-90 Days", "91-180 Days", "181-240 Days", "241 - 365 Days", "366 - 500 Days", "500+ Days"]}
            indexBy="track"
            margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
            groupMode="grouped"
            padding={0.3}
            valueScale={{ type: 'linear' }}
            indexScale={{ type: 'band', round: true }}
            colors={{ scheme: 'dark2' }}
            onClick={async (e) => {
                setLinear(true)
                var date;
                if (selectedDate === undefined) {
                    date = formatDate(new Date())
                } else {
                    date = formatDate(selectedDate)
                }
                setFileName('Arrest_Track' + e.indexValue.replace(/^\D+/g, '') + '_' + date)
                const body = {
                    date: date,
                    track: e.indexValue.replace(/^\D+/g, '')
                }

                try {

                    let response = await fetchJson('/api/drilldown', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(body),
                    })
                    if (response.success) {
                        setRows1(response.data); setVisible(true)
                    } else {
                        setRows1([])
                    }

                } catch (error) {
                    console.log(error);
                } finally {
                    setLinear(false)
                }
            }
            }
            borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Click on any bar to drill down and get track level information and export data',
                legendPosition: 'middle',
                legendOffset: 32
            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Count',
                legendPosition: 'middle',
                legendOffset: -40
            }}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
            // labelFormat={d => <tspan y={-10}>{d}</tspan>}
            legends={[
                {
                    dataFrom: 'keys',
                    anchor: 'bottom-right',
                    direction: 'column',
                    justifyContent: false,
                    translateX: 120,
                    translateY: 0,
                    itemsSpacing: 2,
                    itemWidth: 100,
                    itemHeight: 20,
                    itemDirection: 'left-to-right',
                    itemOpacity: 0.85,
                    symbolSize: 20,
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemOpacity: 1
                            }
                        }
                    ]
                }
            ]}
            animate={true}
            motionStiffness={90}
            motionDamping={15}
        />
    )
}