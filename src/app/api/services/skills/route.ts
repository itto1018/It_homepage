import { NextResponse } from "next/server";
import { updateSkills } from "@/lib/firebase/store/services";
import { Service, Skill } from "@/types/services";
import { auth } from "@/auth";
import { db } from "@/lib/firebase/client";
import { serverTimestamp } from "firebase/firestore";

export async function PUT(request: Request) {
	try {
		const session = await auth();
		if (!session) {
			return new NextResponse("Unauthorized", { status: 401 });
		}

		const { services } = (await request.json()) as { services: Service[] };
		const { skills } = (await request.json()) as { skills: Skill[] };

		const servicesWithTimestamp = services.map((service) => ({
			...service,
			updatedAt: serverTimestamp(),
			...(service.id.startsWith("temp_") && { createdAt: serverTimestamp() }),
		}));

		const skillsWithTimestamp = skills.map((skill) => ({
			...skill,
			updatedAt: serverTimestamp(),
			...(skill.id.startsWith("temp_") && { createdAt: serverTimestamp() }),
		}));

		await updateSkills(skillsWithTimestamp);

		return NextResponse.json({ message: "Skills updated successfully" });
	} catch (error) {
		console.error("Error updating skills:", error);
		return new NextResponse("Internal Server Error", { status: 500 });
	}
}
