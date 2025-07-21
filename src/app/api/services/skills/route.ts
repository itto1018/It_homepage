import { NextRequest } from "next/server";
import { updateSkills } from "@/lib/firebase/store/services";
import { Skill } from "@/types/services";
import { serverTimestamp } from "firebase/firestore";
import { authenticateRequest } from "@/middleware/authMiddleware";

export async function PUT(request: NextRequest) {
	try {
    	const isAuthenticated = await authenticateRequest(request);
    	if (!isAuthenticated) {
    	  return new Response(JSON.stringify({ error: "Unauthorized" }), {
    	    status: 401,
    	  });
    	}

		const { skills } = (await request.json()) as { skills: Skill[] };

		const skillsWithTimestamp = skills.map((skill) => ({
			...skill,
			updatedAt: serverTimestamp(),
			...(skill.skillId.startsWith("temp_") && { createdAt: serverTimestamp() }),
		}));

		await updateSkills(skillsWithTimestamp);

    	return new Response(JSON.stringify({ message: "Success" }), {
    	  status: 200,
    	});
	} catch (error) {
		console.error("Error updating skills:", error);
		return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
	}
}