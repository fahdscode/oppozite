
// Common fashion color name mapping
export const COLOR_MAP: Record<string, string> = {
    // Whites / Creams
    'white': '#FFFFFF',
    'off white': '#F5F5F5',
    'cream': '#FFFDD0',
    'ivory': '#FFFFF0',
    'bone': '#E3DAC9',
    'beige': '#F5F5DC',
    'ecru': '#C2B280',

    // Greys / Blacks
    'black': '#000000',
    'jet black': '#0A0A0A',
    'off black': '#1A1A1A',
    'charcoal': '#36454F',
    'grey': '#808080',
    'gray': '#808080',
    'heather grey': '#9AA297',
    'slate': '#708090',
    'silver': '#C0C0C0',
    'ash': '#B2BEB5',
    'graphite': '#251607', // Often dark/brownish
    'smoke': '#738276',

    // Blues
    'blue': '#0000FF',
    'navy': '#000080',
    'navy blue': '#000080',
    'royal blue': '#4169E1',
    'midnight': '#191970',
    'midnight blue': '#191970',
    'sky': '#87CEEB',
    'baby blue': '#89CFF0',
    'denim': '#1560BD',
    'indigo': '#4B0082',
    'teal': '#008080',
    'turquoise': '#40E0D0',
    'cyan': '#00FFFF',

    // Greens
    'green': '#008000',
    'forest': '#228B22',
    'forest green': '#228B22',
    'olive': '#808000',
    'sage': '#BCB88A',
    'mint': '#98FF98',
    'emerald': '#50C878',
    'lime': '#00FF00',
    'moss': '#8A9A5B',
    'khaki': '#F0E68C',

    // Reds / Pinks / Purples
    'red': '#FF0000',
    'crimson': '#DC143C',
    'maroon': '#800000',
    'burgundy': '#800020',
    'wine': '#722F37',
    'pink': '#FFC0CB',
    'rose': '#FF007F',
    'blush': '#DE5D83',
    'coral': '#FF7F50',
    'peach': '#FFE5B4',
    'purple': '#800080',
    'lavender': '#E6E6FA',
    'lilac': '#C8A2C8',
    'violet': '#EE82EE',
    'plum': '#DDA0DD',
    'mauve': '#E0B0FF',

    // Yellows / Oranges / Browns
    'yellow': '#FFFF00',
    'mustard': '#FFDB58',
    'gold': '#FFD700',
    'orange': '#FFA500',
    'rust': '#B7410E',
    'brown': '#A52A2A',
    'chocolate': '#7B3F00',
    'mocha': '#967969',
    'coffee': '#6F4E37',
    'tan': '#D2B48C',
    'sand': '#C2B280',
    'camel': '#C19A6B',
    'nude': '#F3E5DC',
};

/**
 * Gets a valid CSS color value from a color name.
 * Priority:
 * 1. Metafield color code (passed in)
 * 2. Exact match in COLOR_MAP
 * 3. Last word match in COLOR_MAP (e.g. "Space Grey" -> "Grey")
 * 4. Last word as CSS color
 * 5. Original name as CSS color
 * 6. Fallback (default: #CCCCCC)
 */
export function getColorValue(colorName: string, metaColor?: string | null): string {
    if (metaColor) return metaColor;

    if (!colorName || typeof colorName !== 'string') {
        console.warn('[getColorValue] Invalid colorName:', colorName);
        return '#CCCCCC';
    }

    try {
        const normalizedName = colorName.toLowerCase().trim();

        // 1. Check exact match
        if (COLOR_MAP[normalizedName]) return COLOR_MAP[normalizedName];

        // 2. Check last word match
        const parts = normalizedName.split(' ');
        const lastWord = parts[parts.length - 1];
        if (COLOR_MAP[lastWord]) return COLOR_MAP[lastWord];

        // 3. Try last word as CSS color
        // We can't validate this easily in JS without DOM, so we pass it through.
        if (parts.length > 1) return lastWord;

        // 4. Return original name
        return normalizedName;
    } catch (error) {
        console.error('[getColorValue] Error processing color:', error);
        return '#CCCCCC';
    }
}
