import { ListItem, ListItemIcon, ListItemText, Tooltip } from "@material-ui/core";
import Link from "next/link";


export default function MenuItem(props) {
    const { href, title, icon } = props;

    return (
        <Link href={href} passHref>
            <Tooltip title={title} placement="right">
                <ListItem button>
                    <ListItemIcon>{icon}</ListItemIcon>
                    <ListItemText primary={title} />
                </ListItem>
            </Tooltip>
        </Link>
    )
}