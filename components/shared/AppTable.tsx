import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

export const AppTable = ({ columns, data }: any) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((col: any) => (
            <TableHead key={col.key}>{col.label}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row: any, idx: number) => (
          <TableRow key={idx}>
            {columns.map((col: any) => (
              <TableCell key={col.key}>
                {col.render ? col.render(row) : row[col.key]}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
