import Sidebar from '../components/Sidebar';
import { useState } from 'react';
import {
  GridToolbarContainer,
  GridToolbarExport, DataGrid
} from '@material-ui/data-grid';
import { Button, LinearProgress, Grid } from '@material-ui/core';
import fetchJson from '../lib/fetchJson';
import Close from "@material-ui/icons/Close";
import useUser from '../lib/useUser';
import CustomDataGrid from '../components/CustomDataGrid';
import NivoBar from '../components/NivoBar';
import renderCellExpand from '../components/renderCellExpand';

const columns = [
  { field: 'Data01Data', headerName: 'Track', width: 150 },
  { field: 'Data02Data', headerName: 'Track Description', width: 350 },
  { field: 'Data03Data', headerName: 'Total Pending', width: 200 },
  { field: 'Data04Data', headerName: '0-30 Days', width: 150 },
  { field: 'Data05Data', headerName: '31-60 Days', width: 150 },
  { field: 'Data06Data', headerName: '61-90 Days', width: 150 },
  { field: 'Data07Data', headerName: '91-180 Days', width: 150 },
  { field: 'Data08Data', headerName: '181-240 Days', width: 200 },
  { field: 'Data09Data', headerName: '241 - 365 Days', width: 200 },
  { field: 'Data10Data', headerName: '366 - 500 Days', width: 200 },
  { field: 'Data11Data', headerName: '500+ Days', width: 150 },
  { field: 'Data12Data', headerName: 'Percent Backlog', width: 200 }
];
const columns1 = [
  { field: 'Data01Data', headerName: 'Track', width: 200, renderCell: renderCellExpand },
  { field: 'Data02Data', headerName: 'Track Description', width: 150, renderCell: renderCellExpand },
  { field: 'Data03Data', headerName: 'Total Pening', width: 300, renderCell: renderCellExpand },
  { field: 'Data04Data', headerName: 'RNI', width: 100, renderCell: renderCellExpand },
  { field: 'Data05Data', headerName: '0-30 Days', width: 200, renderCell: renderCellExpand },
  { field: 'Data06Data', headerName: '31-60 Days', width: 300, renderCell: renderCellExpand },
  { field: 'Data07Data', headerName: '61-90 Days', width: 200, renderCell: renderCellExpand },
  { field: 'Data08Data', headerName: '91-180 Days', width: 200, renderCell: renderCellExpand },
  { field: 'Data09Data', headerName: '241 - 365 Days', width: 300, renderCell: renderCellExpand },
  { field: 'Data10Data', headerName: '366 - 500 Days', width: 150, renderCell: renderCellExpand },
  { field: 'Data11Data', headerName: '500+ Days', width: 200, renderCell: renderCellExpand },
  { field: 'Data12Data', headerName: 'Percent Backlog', width: 200, renderCell: renderCellExpand }
];

export default function Dashboard(props) {
  const [linear, setLinear] = useState(false);
  const [selectedDate, setSelectedDate] = useState();
  const [rows, setRows] = useState(props.data.data);
  const [visible, setVisible] = useState(false);
  const [fileName, setFileName] = useState('download')

  const [rows1, setRows1] = useState([]);

  var mapdata = []

  rows.map((record) => {
    mapdata.push({
      "track": record.Data01Data,
      "0-30 Days": record.Data04Data,
      "31-60 Days": record.Data05Data,
      "61-90 Days": record.Data06Data,
      "91-180 Days": record.Data07Data,
      "181-240 Days": record.Data08Data,
      "241 - 365 Days": record.Data09Data,
      "366 - 500 Days": record.Data10Data,
      "500+ Days": record.Data11Data
    })
  })

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarExport csvOptions={{ fileName: fileName }} />
        <Button
          key="close"
          aria-label="Close"
          color="primary"
          endIcon={<Close />}
          onClick={() => setVisible(false)}
        >
          Close
        </Button>
      </GridToolbarContainer>
    );
  }

  const handleDateChange = async (date) => {
    setSelectedDate(date);

    var date = new Date(date)
    var today = date.getDate()
    var month = date.getMonth() + 1
    var year = date.getFullYear()

    if (month <= 9) {
      month = "0" + month
    }

    var final = year + "-" + month + "-" + today
    const body = {
      date: final
    }
    try {

      let response = await fetchJson('/api/details', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      if (response.success) {
        setRows(response.data.data)
      } else {
        setRows([])
      }

    } catch (error) {
      console.log(error);
    } finally {
      setLinear(false)
    }

  };

  const { user } = useUser({ redirectTo: '/' })

  if (!user || user.isLoggedIn === false) {
    return <Sidebar title="loading...">loading...</Sidebar>
  }

  return (
    <Sidebar title="Arrest Data" dateChanged={handleDateChange}>

      <Grid container spacing={2} direction="column">
        {linear && <Grid item>
          <LinearProgress />
        </Grid>}
        {visible &&
          <Grid item>
            <DataGrid autoHeight={true} rows={rows1} columns={columns1} pageSize={5} components={{
              Toolbar: CustomToolbar,
            }} disableSelectionOnClick />
          </Grid>
        }
        <Grid item style={{ height: 300 }}>
          <NivoBar mapdata={mapdata} selectedDate={selectedDate} setLinear={setLinear} setFileName={setFileName} setRows1={setRows1} setVisible={setVisible} />
        </Grid>
        <Grid item>
          <CustomDataGrid rows={rows} columns={columns} />
        </Grid>
      </Grid>
    </Sidebar>
  );
}

export async function getServerSideProps({ req, res }) {
  var date = new Date()
  var today = date.getDate()
  var month = date.getMonth() + 1
  var year = date.getFullYear()

  if (month <= 9) {
    month = "0" + month
  }

  var final = year + "-" + month + "-" + today


  const data = {
    "success": true,
    "data": [
      {
        "id": 8070230,
        "Data01Data": "Track 1",
        "Data02Data": "Misdemeanors",
        "Data03Data": Math.floor(Math.random() * 100).toString(),
        "Data04Data": Math.floor(Math.random() * 100).toString(),
        "Data05Data": Math.floor(Math.random() * 100).toString(),
        "Data06Data": Math.floor(Math.random() * 100).toString(),
        "Data07Data": Math.floor(Math.random() * 100).toString(),
        "Data08Data": Math.floor(Math.random() * 100).toString(),
        "Data09Data": Math.floor(Math.random() * 100).toString(),
        "Data10Data": Math.floor(Math.random() * 100).toString(),
        "Data11Data": Math.floor(Math.random() * 100).toString(),
        "Data12Data": Math.floor(Math.random() * 100).toString() + '%'
      },
      {
        "id": 8070240,
        "Data01Data": "Track 2",
        "Data02Data": "Non-Complex Felonies",
        "Data03Data": Math.floor(Math.random() * 100).toString(),
        "Data04Data": Math.floor(Math.random() * 100).toString(),
        "Data05Data": Math.floor(Math.random() * 100).toString(),
        "Data06Data": Math.floor(Math.random() * 100).toString(),
        "Data07Data": Math.floor(Math.random() * 100).toString(),
        "Data08Data": Math.floor(Math.random() * 100).toString(),
        "Data09Data": Math.floor(Math.random() * 100).toString(),
        "Data10Data": Math.floor(Math.random() * 100).toString(),
        "Data11Data": Math.floor(Math.random() * 100).toString(),
        "Data12Data": Math.floor(Math.random() * 100).toString() + '%'
      },
      {
        "id": 8070250,
        "Data01Data": "Track 3",
        "Data02Data": "Serious Felonies",
        "Data03Data": Math.floor(Math.random() * 100).toString(),
        "Data04Data": Math.floor(Math.random() * 100).toString(),
        "Data05Data": Math.floor(Math.random() * 100).toString(),
        "Data06Data": Math.floor(Math.random() * 100).toString(),
        "Data07Data": Math.floor(Math.random() * 100).toString(),
        "Data08Data": Math.floor(Math.random() * 100).toString(),
        "Data09Data": Math.floor(Math.random() * 100).toString(),
        "Data10Data": Math.floor(Math.random() * 100).toString(),
        "Data11Data": Math.floor(Math.random() * 100).toString(),
        "Data12Data": Math.floor(Math.random() * 100).toString() + '%'
      },
      {
        "id": 8070260,
        "Data01Data": "Track 4",
        "Data02Data": "Complex Felonies",
        "Data03Data": Math.floor(Math.random() * 100).toString(),
        "Data04Data": Math.floor(Math.random() * 100).toString(),
        "Data05Data": Math.floor(Math.random() * 100).toString(),
        "Data06Data": Math.floor(Math.random() * 100).toString(),
        "Data07Data": Math.floor(Math.random() * 100).toString(),
        "Data08Data": Math.floor(Math.random() * 100).toString(),
        "Data09Data": Math.floor(Math.random() * 100).toString(),
        "Data10Data": Math.floor(Math.random() * 100).toString(),
        "Data11Data": Math.floor(Math.random() * 100).toString(),
        "Data12Data": Math.floor(Math.random() * 100).toString() + '%'
      },
      {
        "id": 8070270,
        "Data01Data": "Track 5",
        "Data02Data": "Post Adjudication Cases",
        "Data03Data": Math.floor(Math.random() * 100).toString(),
        "Data04Data": Math.floor(Math.random() * 100).toString(),
        "Data05Data": Math.floor(Math.random() * 100).toString(),
        "Data06Data": Math.floor(Math.random() * 100).toString(),
        "Data07Data": Math.floor(Math.random() * 100).toString(),
        "Data08Data": Math.floor(Math.random() * 100).toString(),
        "Data09Data": Math.floor(Math.random() * 100).toString(),
        "Data10Data": Math.floor(Math.random() * 100).toString(),
        "Data11Data": Math.floor(Math.random() * 100).toString(),
        "Data12Data": Math.floor(Math.random() * 100).toString() + '%'
      }
    ],
    "date": final,
    "isLoggedIn": true,
    "div": 1
  }

  return {
    props: { data: data, date: final },
  }

}