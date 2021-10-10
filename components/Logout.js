import { ListItem, ListItemIcon, ListItemText, Tooltip } from "@material-ui/core";
import Link from "next/link";

import { useRouter } from 'next/router'
import fetchJson from '../lib/fetchJson'
import useUser from "../lib/useUser";

export default function Logout(props) {
    const { title, icon } = props;
    const router = useRouter();
    const { mutateUser } = useUser();
    return (
        <Link href='/api/logout' passHref>
            <Tooltip title={title} placement="right">
                <ListItem button onClick={async (e) => {
                    e.preventDefault()
                    mutateUser(
                        await fetchJson('/api/logout', { method: 'POST' }),
                        false
                    )
                    router.push('/')
                }}>
                    <ListItemIcon>{icon}</ListItemIcon>
                    <ListItemText primary={title} />
                </ListItem>
            </Tooltip>
        </Link>
    )
}