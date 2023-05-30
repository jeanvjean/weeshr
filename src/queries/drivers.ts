export default {
  createDriver: `
        INSERT INTO drivers(
            name,
            email,
            phone_number,
            license_number,
            car_number
        ) VALUES(
            $/name/,
            $/email/,
            $/phone_number/,
            $/license_number/,
            $/car_number/
        )
        RETURNING *
    `,

  getDriver: `
    SELECT name, email, phone_number FROM drivers WHERE email = $/email/ LIMIT 1
    `
};
