import React, { useState } from 'react';

const TableJoin = ({ className }) => {

  const [tableName, setTableName] = useState("")
  const [tablePublic, setTablePublic] = useState(false)

  const LuckyButton = ({className}) => {
    return (<form onSubmit={async (e) => {
      e.preventDefault();
      try {
        await fetch('/api/table/lucky', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        });

      } catch (error) {
        console.error('Error:', error);
      }

    }}>
      <button type="submit" className={className}>Choose for me</button>
    </form>
    )
  }

  const handle_submit = async (e) => {
    e.preventDefault();
    try {
      await fetch('/api/table/create', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ table_name: tableName, table_public: tablePublic })
      });

    } catch (error) {
      console.error('Error:', error);
    }

    setTableName("")
    setTablePublic(true)
  }

  return (
    <div className={className + " text-center border-4 border-orange-200 m-12 p-4 rounded-3xl bg-slate-300 shadow-xl flex flex-col items-center"}>
      <h2 className='text-3xl font-semibold'>Create Table</h2>


      <div className='m-4 border border-gray-400  rounded-2xl bg-gray-200 p-6'>

        <div className='flex flex-col'>
          <label>Table Name</label>
          <input className="appearance-none block bg-white text-gray-700 border border-gray-200 rounded-3xl py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="text" value={tableName} onChange={(e) => setTableName(e.target.value)} placeholder='Table Name' />

        </div>
        <div>
          <label>Public</label>
          <input  className="m-3" type="checkbox" value={tablePublic} onChange={(e) => setTablePublic(true)} />
        </div>
        <form onSubmit={handle_submit}>
          <button type="submit" className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2 border rounded-xl shadow-md">Create</button>
        </form>

      </div>

      <div className='flex flex-row'>


        <LuckyButton className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2 border rounded-xl shadow-md" />
      </div>

    </div>
  )
}

export default TableJoin