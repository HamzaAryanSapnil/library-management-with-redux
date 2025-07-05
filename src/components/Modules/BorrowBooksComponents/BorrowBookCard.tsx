import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { BorrowedBookSummary } from "@/types";



interface BorrowBookCardProps {
  borrowedBook: BorrowedBookSummary;
}
export default function BorrowBookCard({ borrowedBook }: BorrowBookCardProps) {
  return (
      <Card key={borrowedBook.book._id} className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-primary font-lora text-xl">
            {borrowedBook.book.title}
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            ISBN: {borrowedBook.book.isbn}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="font-medium">
            Total Borrowed:{" "}
            <Badge variant="secondary">{borrowedBook.totalQuantity}</Badge>
          </p>
        </CardContent>
      </Card>

  );
}
