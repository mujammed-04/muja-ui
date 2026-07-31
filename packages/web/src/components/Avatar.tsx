'use client';

import type { Size } from '@muja-ui/core';
import { cx } from '@muja-ui/utils';
import type { ComponentPropsWithRef, ReactElement } from 'react';
import { useState } from 'react';

export interface AvatarProps extends ComponentPropsWithRef<'span'> {
  src?: string;
  /** Person's name — used for the alt text and the initials fallback. */
  name?: string;
  size?: Size;
  shape?: 'circle' | 'square';
}

function initials(name: string): string {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? '';
  const second = parts.length > 1 ? (parts[parts.length - 1]?.[0] ?? '') : '';
  return (first + second).toUpperCase();
}

/**
 * User avatar with an initials fallback when there is no image or it fails to
 * load. Client component (tracks image load errors) — import from
 * `@muja-ui/web/client`.
 *
 * ```tsx
 * <Avatar src={user.photoUrl} name="Aruzhan Bekova" />
 * ```
 */
export function Avatar({
  src,
  name,
  size = 'md',
  shape = 'circle',
  className,
  children,
  ...rest
}: AvatarProps): ReactElement {
  const [errored, setErrored] = useState(false);
  const showImage = Boolean(src) && !errored;

  return (
    <span
      className={cx('mj-avatar', className)}
      data-size={size}
      data-shape={shape}
      role={name && !showImage ? 'img' : undefined}
      aria-label={name && !showImage ? name : undefined}
      {...rest}
    >
      {showImage ? (
        <img
          className="mj-avatar__image"
          src={src}
          alt={name ?? ''}
          onError={() => setErrored(true)}
        />
      ) : (
        <span className="mj-avatar__fallback" aria-hidden="true">
          {children ?? (name ? initials(name) : null)}
        </span>
      )}
    </span>
  );
}
