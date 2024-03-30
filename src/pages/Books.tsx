import {Button, Table} from "antd";
import React, {useEffect, useState} from "react";

import {history} from "@@/core/history";

const BookTable: React.FC = () => {
  // @ts-ignore
  const [books, setBooks] = useState([])
  const clickHandler = (args: any) => {
    console.log(args)
    history.push('/welcome')
  }
  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
    },{
      title: '操作',
      dataIndex: 'operator',
      key: 'operator',
      render: (...args: any) => (
        <Button onClick={() => clickHandler(args)}>查看全文</Button>
      ),
    }
  ]
  const  getBooks = () => {
    fetch('/dataset/ls', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res: { json: () => any; }) => {
      return res.json()
    }).then( ({data}) => {
      setBooks(data.map((item: any) => {
        return {
          name: item ,
          key: item
        }
      }))
    })
  }
  useEffect(() => {
    getBooks()
  })
  return  <Table columns={columns} dataSource={books}></Table>}
export const Books: React.FC = () => {

  return <div>

    {/*<Button type="primary" onClick={getBooks}>api test</Button>*/}
    <BookTable></BookTable>
  </div>
}
export default  Books;
