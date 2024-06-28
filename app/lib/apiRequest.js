export const makePostRequest = async(endPoint, data, resourceName) => {

	try
	{
		const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
		const callingURL = endPoint;
		console.log(callingURL);
		const response = await fetch(callingURL, {
			method: "POST",
			headers: { "Content-Type": "application/json", },
			body: JSON.stringify(data),
		});

		if(response.ok)
		{
			return { message: `New ${ resourceName } Created Successfully...!`, color: "Success" };
			// redirect();
		}
		else
		{
			if(response.status === 409)
			{
				return { message: `The Given Stock is not Enough...!`, color: "Warning"};
			}
			else
			{
				return { message: `Something went wrong, Please contact Admin...!`, color: "Error"};
			}
		}
	}
	catch (error)
	{
		console.log(error);
	}
}