import { cx } from '@muja-ui/utils';
import type { ComponentPropsWithRef, ReactElement } from 'react';
import { Heading, type HeadingProps } from './Heading';

export interface CardProps extends ComponentPropsWithRef<'div'> {
  /** `outline` (default) is bordered, `elevated` adds a shadow, `filled` uses a muted background. */
  variant?: 'outline' | 'elevated' | 'filled';
}

/**
 * Surface container. Compose with `CardHeader`, `CardTitle`,
 * `CardDescription`, `CardContent` and `CardFooter`.
 *
 * ```tsx
 * <Card>
 *   <CardHeader>
 *     <CardTitle>Room A101</CardTitle>
 *     <CardDescription>Available today</CardDescription>
 *   </CardHeader>
 *   <CardContent>…</CardContent>
 *   <CardFooter><Button>Book</Button></CardFooter>
 * </Card>
 * ```
 */
export function Card({ variant = 'outline', className, ...rest }: CardProps): ReactElement {
  return <div className={cx('mj-card', className)} data-variant={variant} {...rest} />;
}

export function CardHeader({
  className,
  ...rest
}: ComponentPropsWithRef<'div'>): ReactElement {
  return <div className={cx('mj-card__header', className)} {...rest} />;
}

export type CardTitleProps = HeadingProps<'h3'>;

export function CardTitle({ className, ...rest }: CardTitleProps): ReactElement {
  return (
    <Heading
      level={3}
      size="lg"
      className={cx('mj-card__title', className)}
      {...(rest as HeadingProps)}
    />
  );
}

export function CardDescription({
  className,
  ...rest
}: ComponentPropsWithRef<'p'>): ReactElement {
  return <p className={cx('mj-card__description', className)} {...rest} />;
}

export function CardContent({
  className,
  ...rest
}: ComponentPropsWithRef<'div'>): ReactElement {
  return <div className={cx('mj-card__content', className)} {...rest} />;
}

export function CardFooter({
  className,
  ...rest
}: ComponentPropsWithRef<'div'>): ReactElement {
  return <div className={cx('mj-card__footer', className)} {...rest} />;
}
