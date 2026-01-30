import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface Column {
  key: string;
  header: string;
  render?: (value: any, row: any) => React.ReactNode;
}

interface DataTableProps {
  columns: Column[];
  data: any[];
  title?: string;
}

export const DataTable = ({ columns, data, title }: DataTableProps) => {
  const getCriticalityBadge = (value: string) => {
    const variants: Record<string, string> = {
      High: "bg-danger/10 text-danger border-danger/20",
      Medium: "bg-warning/10 text-warning border-warning/20",
      Low: "bg-success/10 text-success border-success/20",
    };
    return (
      <Badge variant="outline" className={variants[value] || ""}>
        {value}
      </Badge>
    );
  };

  const getTypeBadge = (value: string) => {
    const variants: Record<string, string> = {
      Bridge: "bg-info/10 text-info border-info/20",
      Pavement: "bg-muted text-muted-foreground",
      Drainage: "bg-info/10 text-info border-info/20",
      Culvert: "bg-muted text-muted-foreground",
      Signage: "bg-info/10 text-info border-info/20",
      Lighting: "bg-info/10 text-info border-info/20",
    };
    return (
      <Badge variant="outline" className={variants[value] || "bg-muted text-muted-foreground"}>
        {value}
      </Badge>
    );
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {title && (
        <div className="px-5 py-4 border-b border-border">
          <h3 className="font-semibold text-foreground">{title}</h3>
        </div>
      )}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="table-header">
              {columns.map((col) => (
                <TableHead key={col.key} className="text-xs font-semibold">
                  {col.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row, i) => (
              <TableRow key={i} className="hover:bg-muted/30">
                {columns.map((col) => (
                  <TableCell key={col.key} className="text-sm">
                    {col.render
                      ? col.render(row[col.key], row)
                      : col.key === "criticality"
                      ? getCriticalityBadge(row[col.key])
                      : col.key === "asset_type"
                      ? getTypeBadge(row[col.key])
                      : col.key === "asset_name" || col.key === "asset_id"
                      ? <span className="text-primary hover:underline cursor-pointer">{row[col.key]}</span>
                      : row[col.key]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
