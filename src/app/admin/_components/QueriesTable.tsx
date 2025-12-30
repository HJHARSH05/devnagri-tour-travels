import { QueriesTypes } from "@/types";
import React, { useEffect, useState } from "react";
import useAdminHook from "../_hook/admin.hooks";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const QueriesTable = () => {
  const [queries, setQueries] = useState<QueriesTypes[]>([]);
  const [offset, setoffset] = useState(1);
  const { fetchQueries } = useAdminHook();
  useEffect(() => {
    const fetchQueriesAsync = async () => {
      const queries = await fetchQueries(offset);
      setQueries(queries);
    };
    fetchQueriesAsync();
  }, [offset, fetchQueries]);

  if (queries.length === 0)
    return <h5 className="text-center mt-10">No Queries found</h5>;
  return (
    <div className="min-h-[calc(100vh-10rem)] w-full bg-gray-300/50 p-2">
      <Table>
        <TableHeader className="border-2 border-black">
          <TableRow className="border-2 border-black bg-gray-400">
            <TableHead className="w-[50px] font-medium border border-black">
              Sr.no
            </TableHead>
            <TableHead className="border-r border-black">Name</TableHead>
            <TableHead className="border-r border-black">Email</TableHead>
            <TableHead className="border-r border-black min-w-[200px] text-right">
              Message
            </TableHead>
            {/* <TableHead className="border-r border-black">Action</TableHead> */}
          </TableRow>
        </TableHeader>
        <TableBody className="border-2 border-black">
          {
            queries.map((query, index) => (
              <TableRow
                key={index + 1}
                className="border-2 border-black font-medium"
              >
                <TableCell className="w-[50px] border border-black">
                  {query.id}
                </TableCell>
                <TableCell className="border-r border-black">
                  {query.name}
                </TableCell>
                <TableCell className="border-r border-black">
                  {query.email}
                </TableCell>
                <TableCell className="border-r border-black text-right">
                  {query.message}
                </TableCell>
              </TableRow>
            ))
          }
        </TableBody>
        <TableCaption className="text-center mb-0">
          <div className="mt-5 flex items-center justify-between w-2/3 mx-auto">
            <Button
              className="cursor-pointer"
              variant={"outline"}
              disabled={offset == 1}
              onClick={() => {
                if (offset > 10) setoffset(offset - 10);
                else setoffset(1);
              }}
            >
              Previous
            </Button>
            A list of all the Bookings.
            <Button
              className="cursor-pointer"
              disabled={queries.length < 10}
              onClick={() => setoffset(offset + 10)}
            >
              Next
            </Button>
          </div>
        </TableCaption>
      </Table>
    </div>
  );
};

export default QueriesTable;
