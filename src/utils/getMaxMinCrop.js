import { agricultureData } from "./dataset"

export const getMaxMinCrop = () => {
    const data = agricultureData;

    // Grouping data by year
    const groupedByYear = data.reduce((acc, curr) => {        
        // taking the year from end of Year in the dataset
        const year = curr.Year.split(',').pop().trim();
        // const year = curr.Year.split(',')[1].trim();
        // console.log(year);

        if (!acc[year]) {
            acc[year] = [];
        }
        acc[year].push(curr);
        return acc;
    }, {});

    // Calculating max and min crop for each year
    const maxMinCrops = Object.keys(groupedByYear).map(year => {
        const yearData = groupedByYear[year];
        const maxCrop = yearData.reduce((prev, curr) => {
            return (
                prev['Crop Production (UOM:t(Tonnes))'] || 0) > (curr['Crop Production (UOM:t(Tonnes))'] || 0) ? prev : curr;
        }, {});

        const minCrop = yearData.reduce((prev, curr) => {
            return (prev['Crop Production (UOM:t(Tonnes))'] || Infinity) < (curr['Crop Production (UOM:t(Tonnes))'] || Infinity) ? prev : curr;
        }, {});

        return {
            Year: year,
            CropWithMaxProduction: maxCrop['Crop Name'],
            CropWithMinProduction: minCrop['Crop Name'],
        };
    });

    return maxMinCrops;
}