import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

const SizeGuide = () => {
    return (
        <Layout>
            <section className="py-16 md:py-24 bg-foreground text-background">
                <div className="container">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="font-display text-5xl md:text-7xl text-center uppercase"
                    >
                        Size Guide
                    </motion.h1>
                    <p className="text-center mt-4 text-background/60 max-w-xl mx-auto">
                        Find your perfect fit.
                    </p>
                </div>
            </section>

            <section className="py-12 md:py-20">
                <div className="container max-w-3xl">
                    <h3 className="text-2xl font-display mb-6">T-Shirts & Tops</h3>
                    <Table className="mb-12">
                        <TableHeader>
                            <TableRow>
                                <TableHead>Size</TableHead>
                                <TableHead>Chest (cm)</TableHead>
                                <TableHead>Length (cm)</TableHead>
                                <TableHead>Shoulder (cm)</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell className="font-medium">S</TableCell>
                                <TableCell>106</TableCell>
                                <TableCell>72</TableCell>
                                <TableCell>48</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">M</TableCell>
                                <TableCell>112</TableCell>
                                <TableCell>74</TableCell>
                                <TableCell>50</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">L</TableCell>
                                <TableCell>118</TableCell>
                                <TableCell>76</TableCell>
                                <TableCell>52</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">XL</TableCell>
                                <TableCell>124</TableCell>
                                <TableCell>78</TableCell>
                                <TableCell>54</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>

                    <h3 className="text-2xl font-display mb-6">Pants & Bottoms</h3>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Size</TableHead>
                                <TableHead>Waist (cm)</TableHead>
                                <TableHead>Length (cm)</TableHead>
                                <TableHead>Hip (cm)</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell className="font-medium">S</TableCell>
                                <TableCell>76</TableCell>
                                <TableCell>102</TableCell>
                                <TableCell>100</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">M</TableCell>
                                <TableCell>81</TableCell>
                                <TableCell>104</TableCell>
                                <TableCell>105</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">L</TableCell>
                                <TableCell>86</TableCell>
                                <TableCell>106</TableCell>
                                <TableCell>110</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">XL</TableCell>
                                <TableCell>91</TableCell>
                                <TableCell>108</TableCell>
                                <TableCell>115</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>

                    <div className="mt-8 text-sm text-muted-foreground">
                        <p>* Measurements are approximate and may vary slightly by style.</p>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default SizeGuide;
