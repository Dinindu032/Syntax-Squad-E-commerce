import CarListing from '../schema/CarListing.js';

export const CarListing = async (req, res) => {
    const { listingTitle, tagline, originalPrice, sellingPrice, category, condition, make, model, year, driveType, transmission, fuelType, mileage, engineSize, cylinder, color, door, vin, offerType, listingDescription, userId } = req.body;

    try {
        const newCarListing = new CarListing({
            listingTitle,
            tagline,
            originalPrice,
            sellingPrice,
            category,
            condition,
            make,
            model,
            year,
            driveType,
            transmission,
            fuelType,
            mileage,
            engineSize,
            cylinder,
            color,
            door,
            vin,
            offerType,
            listingDescription,
            userId
        });

        await newCarListing.save();
        return res.status(201).json("Save listing successfully!");

    } catch (error) {
        return res.status(500).json({ error: 'Server error, please try again later.' });
    }
}