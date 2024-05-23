import { useEffect, useState } from 'react';

import TableJoin from "../components/table_join"
import TableView from "../components/table_view"


const FindTable = ({ auth }) => {

    const [tables, setTables] = useState(null)

    useEffect(() => {

        const fetch_tables = async () => {
            const response = await fetch("/api/table")
            const json = await response.json()

            if (response.ok) {
                setTables(json)
            }
        }

        fetch_tables()

    }, [])

    const MultiTableView = ({ className }) => {
        if (tables == null) {
            return <p>Loading...</p>
        }
        const listOfTables = tables.map((table) => {
            return <li key={table._id} className='my-4'><TableView table={table} auth={auth} /></li>
        })


        return (
            <ul className={className}>{listOfTables}</ul>
        )
    }


    const TableJoinView = ({className}) => {
        if (auth) {
            return <TableJoin className={className}/>
        } else {
            return <p>You must sign in first</p>
        }
    }

    return (
        <div>
            <TableJoinView className="hover:scale-105 duration-200"/>
            <MultiTableView className="grid grid-cols-2 place-items-center my-16" />

        </div>
    )
}

export default FindTable