import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: string;
}

const clothingSizes = {
  headers: ["Size", "Chest (in)", "Waist (in)", "Hips (in)"],
  rows: [
    ["XS", "32-34", "24-26", "34-36"],
    ["S", "34-36", "26-28", "36-38"],
    ["M", "36-38", "28-30", "38-40"],
    ["L", "38-40", "30-32", "40-42"],
    ["XL", "40-42", "32-34", "42-44"],
  ],
};

const pantSizes = {
  headers: ["Size", "Waist (in)", "Inseam (in)", "Hip (in)"],
  rows: [
    ["26", "26", "30", "35"],
    ["28", "28", "30", "37"],
    ["30", "30", "32", "39"],
    ["32", "32", "32", "41"],
    ["34", "34", "32", "43"],
  ],
};

const shoeSizes = {
  headers: ["EU", "US", "UK", "CM"],
  rows: [
    ["36", "6", "3.5", "22.5"],
    ["37", "6.5", "4", "23"],
    ["38", "7.5", "5", "24"],
    ["39", "8", "5.5", "24.5"],
    ["40", "9", "6.5", "25.5"],
    ["41", "9.5", "7", "26"],
    ["42", "10.5", "8", "27"],
  ],
};

export const SizeGuideModal = ({ isOpen, onClose, category }: SizeGuideModalProps) => {
  const getSizeData = () => {
    if (category === "Footwear") return shoeSizes;
    if (category === "Bottoms") return pantSizes;
    return clothingSizes;
  };

  const sizeData = getSizeData();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-background border border-border z-50 p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-display uppercase tracking-wider">Size Guide</h2>
              <motion.button
                onClick={onClose}
                className="p-2 hover:bg-secondary transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    {sizeData.headers.map((header) => (
                      <th
                        key={header}
                        className="py-3 px-4 text-left font-medium uppercase tracking-wider text-muted-foreground"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sizeData.rows.map((row, index) => (
                    <motion.tr
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b border-border/50 hover:bg-secondary/50 transition-colors"
                    >
                      {row.map((cell, cellIndex) => (
                        <td key={cellIndex} className="py-3 px-4">
                          {cell}
                        </td>
                      ))}
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 text-sm text-muted-foreground">
              <p className="mb-2">
                <strong>How to Measure:</strong>
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>Chest: Measure around the fullest part</li>
                <li>Waist: Measure around your natural waistline</li>
                <li>Hips: Measure around the fullest part</li>
              </ul>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
