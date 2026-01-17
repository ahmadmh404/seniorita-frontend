"use client";

import { DataPage } from "@/lib/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Fragment, type ComponentType } from "react";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "../ui/empty";
import { BlocksIcon, Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { DataTablePagination } from "../shared/data-pagination";
import { useSearchParams } from "next/navigation";

type PaginationProp = number | undefined;
type TData<T> = DataPage<T>;
type ItemRendererProps<T, N extends string> = { [K in N]: T };

interface ListRendererProps<T, N extends string> {
  queryFn: ({
    start,
  }: {
    start: PaginationProp;
    page: PaginationProp;
  }) => Promise<TData<T>>;
  queryKey: N;
  ItemRenderer: ComponentType<ItemRendererProps<T, N> & { index: number }>;
  className?: string;
}

export function InfiniteQueryWrapper<T, N extends string>({
  queryFn,
  queryKey,
  ItemRenderer,
  className = "",
}: ListRendererProps<T, N>) {
  const searchParams = useSearchParams();
  const page = searchParams.get("page");

  const { data, status, refetch, isLoading, isPending } = useInfiniteQuery({
    queryFn: ({ pageParam }) =>
      queryFn({
        start: pageParam ?? 0,
        page: Number(page) ?? 1,
      }),
    queryKey: [`$${queryKey}s`],
    initialPageParam: undefined as number | undefined,
    getNextPageParam: ({ pagination, data }) => {
      const count = data.length ?? 0;
      const pageSize = pagination?.limit;
      const pageNumber = pagination
        ? Math.floor(pagination?.start / pagination?.limit) + 1
        : 1;

      if (!pageSize || !pageNumber) {
        return;
      }

      if (count < pageSize) {
        return;
      }

      return pageSize * pageNumber + 1;
    },
  });

  const resources = data?.pages.flatMap((page) => page.data) || [];
  const pagination =
    data?.pages
      .flatMap((page) => page.pagination)
      .at((data.pages.flatMap((page) => page.pagination) || []).length - 1) ??
    null;

  if (status === "pending" || isLoading || isPending) {
    return (
      <div className="flex flex-col items-center my-10 space-y-2">
        <Loader2 className="animate-spin size-5" />
        <p className="text-lg text-muted-foreground">جاري تحميل البيانات...</p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex flex-col items-center my-10">
        <p className="text-muted-foreground">
          فشل تحميل البيانات, يرجى المحاولة مرة أخرى
        </p>
        <Button onClick={() => refetch()} variant={"link"}>
          أنقر للمحاولة مرة أخرى
        </Button>
      </div>
    );
  }

  if (status === "success" && resources.length === 0) {
    return <NoData />;
  }

  console.log("resources: ", resources);

  return (
    <div className="space-y-7">
      <div className={className}>
        {resources.map((item, i) => (
          <Fragment key={i}>
            <ItemRenderer
              {...({ [queryKey]: item } as ItemRendererProps<T, N>)}
              {...{ index: i }}
            />
          </Fragment>
        ))}
      </div>

      {pagination && <DataTablePagination pagination={pagination} />}
    </div>
  );
}

function NoData() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant={"icon"}>
          <BlocksIcon className="size-16 text-primary mb-2" />
        </EmptyMedia>

        <EmptyTitle>لا يوجد بيانات </EmptyTitle>
        <EmptyDescription>قم بالبحق عن شيء أخر </EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}
