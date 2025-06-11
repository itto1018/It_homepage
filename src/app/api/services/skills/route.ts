import { NextResponse } from "next/server";
import { updateSkills } from "@/lib/firebase/services";
import { Skill } from "@/types/serviceSkill";
import { auth } from "@/auth";

export async function PUT(request: Request) {
	try {
		const session = await auth();
		if (!session) {
			return new NextResponse("Unauthorized", { status: 401 });
		}

		const { skills } = (await request.json()) as { skills: Skill[] };
		await updateSkills(skills);

		return NextResponse.json({ message: "Skills updated successfully" });
	} catch (error) {
		console.error("Error updating skills:", error);
		return new NextResponse("Internal Server Error", { status: 500 });
	}
}
