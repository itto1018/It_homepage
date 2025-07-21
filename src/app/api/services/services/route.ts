import { NextRequest, NextResponse } from "next/server";
import { updateServices } from "@/lib/firebase/store/services";
import { Service } from "@/types/services";
import { serverTimestamp } from "firebase/firestore";
import { authenticateRequest } from "@/middleware/authMiddleware";

export async function PUT(request: NextRequest) {
	try {
		const isAuthenticated = await authenticateRequest(request);
		if (!isAuthenticated) {
			return new NextResponse("Unauthorized", { status: 401 });
		}

		const { services } = (await request.json()) as { services: Service[] };

		const servicesWithTimestamp = services.map((service) => ({
			...service,
			updatedAt: serverTimestamp(),
			...(service.id.startsWith("temp_") && { createdAt: serverTimestamp() }),
		}));

		await updateServices(servicesWithTimestamp);

		return new Response(JSON.stringify({ message: "Success" }), {
			status: 200,
		});
	} catch (error) {
		console.error("Error updating services:", error);
		return new Response(JSON.stringify({ error: "Internal server error" }), {
			status: 500,
		});
	}
}
