"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Pagination as PaginationType } from "@/lib/types";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

interface PaginationProps {
  pagination: PaginationType;
}

export function DataTablePagination({ pagination }: PaginationProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const { limit, start, total } = pagination;

  const totalPages = Math.ceil(total / limit);
  const currentPage = Math.floor(start / limit) + 1;

  const updatePage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  const getPageNumbers = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots: (number | null)[] = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    console.log("range: ", range);

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, null);
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (totalPages > 1) {
      if (currentPage + delta < totalPages - 1) {
        rangeWithDots.push(null, totalPages);
      } else {
        rangeWithDots.push(totalPages);
      }
    }

    return rangeWithDots;
  };

  return (
    <div
      dir="ltr"
      className="flex items-center justify-between w-full px-4 py-6"
    >
      {/* Summary */}

      {/* Pagination Controls */}
      {(totalPages > currentPage || currentPage !== 1) && (
        <Pagination>
          <PaginationContent>
            {/* Previous Button */}
            <PaginationItem>
              <PaginationPrevious
                onClick={() => currentPage > 1 && updatePage(currentPage - 1)}
                className={
                  currentPage === 1 ? "pointer-events-none opacity-50" : ""
                }
              />
            </PaginationItem>

            {/* Page Numbers */}
            {getPageNumbers().map((page, index) => (
              <PaginationItem key={index}>
                {page === null ? (
                  <PaginationEllipsis />
                ) : (
                  <PaginationLink
                    onClick={() => updatePage(page as number)}
                    isActive={currentPage === page}
                    className="cursor-pointer"
                  >
                    {page}
                  </PaginationLink>
                )}
              </PaginationItem>
            ))}

            {/* Next Button */}
            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  currentPage < totalPages && updatePage(currentPage + 1)
                }
                className={
                  currentPage === totalPages
                    ? "pointer-events-none opacity-50"
                    : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
