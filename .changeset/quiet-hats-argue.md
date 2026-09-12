---
'@muja-ui/native': patch
'@muja-ui/web': patch
---

Ring the Avatar so the circle is visible against the page

`Avatar`'s fill is a near-page colour in both themes (`primarySubtle` on native,
`bg-muted` on web), so an avatar with no photo contrasted about 1.1:1 with the
page behind it and read as loose initials with no shape around them — most
visibly on a dark-theme profile header. Both now draw a hairline
`borderStrong` ring, which clears 3:1 against either page colour. The web rule
sets `box-sizing: border-box` alongside it so the ring does not grow the
fixed size.
