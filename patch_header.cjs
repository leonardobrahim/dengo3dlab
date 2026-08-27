const fs = require('fs');
const path = 'src/layouts/store/StoreHeader.tsx';
let content = fs.readFileSync(path, 'utf8');

// Remove the announcement banner
const announcementBannerRegex = /\{\/\* Top Dengo Announcement Banner in Candy Colors \*\/\}\s*<div className="bg-gradient-to-r from-pink-500 via-pink-400 to-sky-400[\s\S]*?<\/div>\s*\{\/\* Main Desktop & Mobile Header Bar \*\/\}/;
content = content.replace(announcementBannerRegex, '{/* Main Desktop & Mobile Header Bar */}');

// Change header background
content = content.replace(
  '<header className="sticky top-0 z-40 w-full border-b border-pink-200/60 dark:border-pink-900/40 bg-background/95 backdrop-blur-md">',
  '<header className="sticky top-0 z-40 w-full bg-gradient-to-r from-pink-500 via-pink-400 to-sky-400 text-white shadow-md">'
);

// Menu Toggle (Mobile Left)
content = content.replace(
  'className="hover:bg-pink-50 dark:hover:bg-pink-950/40"',
  'className="hover:bg-white/20 text-white"'
).replace(
  '<Menu className="h-5 w-5 text-pink-500" />',
  '<Menu className="h-5 w-5" />'
);

// Desktop Navigation Links
// Change "text-muted-foreground hover:text-foreground hover:bg-pink-50 dark:hover:bg-card"
// and the active states.
content = content.replace(
  /bg-pink-100\/70 text-pink-700 dark:bg-pink-950\/60 dark:text-pink-300/g,
  'bg-white/20 text-white shadow-sm'
).replace(
  /bg-sky-100\/70 text-sky-700 dark:bg-sky-950\/60 dark:text-sky-300/g,
  'bg-white/20 text-white shadow-sm'
).replace(
  /text-muted-foreground hover:text-foreground hover:bg-pink-50 dark:hover:bg-card/g,
  'text-white/90 hover:text-white hover:bg-white/10'
);

// Search Mobile Toggle
content = content.replace(
  '<Search className="h-4 w-4 text-pink-500" />',
  '<Search className="h-4 w-4 text-white" />'
).replace(
  'className="md:hidden"',
  'className="md:hidden hover:bg-white/20 text-white"'
);

// Wishlist
content = content.replace(
  'className="relative border-pink-200 hover:bg-pink-50"',
  'className="relative border-white/30 hover:bg-white/20 text-white"'
).replace(
  '<Heart className="h-4 w-4 text-pink-500 fill-pink-500/20" />',
  '<Heart className="h-4 w-4 text-white fill-white/20" />'
).replace(
  'bg-pink-500 text-[10px] font-bold text-white shadow-xs',
  'bg-white text-pink-500 text-[10px] font-bold shadow-xs'
);

// Avatar trigger ring
content = content.replace(
  'ring-pink-200 dark:ring-pink-900/60 hover:ring-pink-400',
  'ring-white/30 hover:ring-white/70'
);

// Cart Button
// It was: variant="dengo" size="sm" ...
content = content.replace(
  'variant="dengo"',
  'variant="outline"'
).replace(
  'className="gap-1.5 text-xs font-bold shrink-0"',
  'className="gap-1.5 text-xs font-bold shrink-0 bg-white/20 border-white/30 hover:bg-white/30 text-white"'
).replace(
  'bg-white text-pink-600',
  'bg-white text-pink-500' // Keeping it white bg pink text for the badge
);

// Right actions box (Wishlist, Dropdown, Cart) - need to check if there are other hover:bg-pink-50
// Actually replaced everything needed there.

fs.writeFileSync(path, content, 'utf8');
