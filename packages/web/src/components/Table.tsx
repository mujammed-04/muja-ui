import { cx } from '@muja-ui/utils';
import type { ComponentPropsWithRef, ReactElement } from 'react';

export interface TableProps extends ComponentPropsWithRef<'table'> {
  /** Adds zebra striping to body rows. */
  striped?: boolean;
  /** Compact row height. */
  dense?: boolean;
}

/**
 * Semantic `<table>` inside a horizontally scrollable wrapper. Compose with
 * `TableHeader`, `TableBody`, `TableFooter`, `TableRow`, `TableHeaderCell`,
 * `TableCell` and `TableCaption`.
 *
 * ```tsx
 * <Table striped>
 *   <TableHeader>
 *     <TableRow><TableHeaderCell>Name</TableHeaderCell></TableRow>
 *   </TableHeader>
 *   <TableBody>
 *     <TableRow><TableCell>Aruzhan</TableCell></TableRow>
 *   </TableBody>
 * </Table>
 * ```
 */
export function Table({ striped = false, dense = false, className, ...rest }: TableProps): ReactElement {
  return (
    <div className="mj-table-wrapper">
      <table
        className={cx('mj-table', className)}
        data-striped={striped || undefined}
        data-dense={dense || undefined}
        {...rest}
      />
    </div>
  );
}

export function TableHeader({
  className,
  ...rest
}: ComponentPropsWithRef<'thead'>): ReactElement {
  return <thead className={cx('mj-table__header', className)} {...rest} />;
}

export function TableBody({ className, ...rest }: ComponentPropsWithRef<'tbody'>): ReactElement {
  return <tbody className={cx('mj-table__body', className)} {...rest} />;
}

export function TableFooter({
  className,
  ...rest
}: ComponentPropsWithRef<'tfoot'>): ReactElement {
  return <tfoot className={cx('mj-table__footer', className)} {...rest} />;
}

export function TableRow({ className, ...rest }: ComponentPropsWithRef<'tr'>): ReactElement {
  return <tr className={cx('mj-table__row', className)} {...rest} />;
}

export function TableHeaderCell({
  className,
  ...rest
}: ComponentPropsWithRef<'th'>): ReactElement {
  return <th scope="col" className={cx('mj-table__head-cell', className)} {...rest} />;
}

export function TableCell({ className, ...rest }: ComponentPropsWithRef<'td'>): ReactElement {
  return <td className={cx('mj-table__cell', className)} {...rest} />;
}

export function TableCaption({
  className,
  ...rest
}: ComponentPropsWithRef<'caption'>): ReactElement {
  return <caption className={cx('mj-table__caption', className)} {...rest} />;
}
