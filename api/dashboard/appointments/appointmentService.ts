export const fetchAppointmentDetailsAndToken = async (appointmentId: string, token: string) => {
    try {
        const response = await fetch(`https://api.dokto.health/api/v1/appointment/meeting/${appointmentId}`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error("Something went wrong");
        }

        const { data } = await response.json();
        const doctorFirstName = data.users[0].personalInfo.firstName;
        const doctorLastName = data.users[0].personalInfo.lastName;
        const doctorType = data.users[0].doctorType;
        const rating = data.users[0].rating;
        const imgUrl = data.users[0].personalInfo.imgUrl;
        const patientFirstName = data.users[1].firstName;
        const patientLastName = data.users[1].lastName;
        const profilePhoto = data.users[1].profilePhoto;

        return {
            patientFirstName,
            patientLastName,
            doctorFirstName,
            doctorLastName,
            token: data.token,
            doctorType,
            rating,
            imgUrl,
            profilePhoto,
        };
    } catch (error) {
        console.error(error);
        throw error;
    }
};
