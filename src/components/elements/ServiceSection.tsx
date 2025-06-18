"use client";

import React, { useEffect, useState } from "react";
import { ServiceCard } from "@/components/elements/ServiceCard";
import { FaDatabase, FaLaptopCode } from "react-icons/fa";
import { IoAnalyticsSharp } from "react-icons/io5";
import { RxReload } from "react-icons/rx";

import { DEFAULT_SERVICES } from "@/constants/services";
import { getSkills } from "@/lib/firebase/store/services";

import type { Service, Skill } from "@/types/service";

interface Props {
	initialSkills: Skill[];
}

const ServiceSection: React.FC<Props> = ({ initialSkills }) => {
	const [isLoading, setIsLoading] = useState(true);
	// サービスは定数から取得
	const [services] = useState<Service[]>(DEFAULT_SERVICES);

	// スキルはFirestoreから取得(Read)
	const [skills, setSkills] = useState<Skill[]>(initialSkills || []);
	useEffect(() => {
		const fetchSkills = async () => {
			try {
				const skillsData = await getSkills();
				if (skillsData) {
					setSkills(skillsData);
				}
			} catch (error) {
				console.error("Error fetching skills:", error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchSkills();
	}, []);

	if (isLoading) {
		return <div className="text-center py-10">Loading...</div>;
	}

	return (
		<div className="mb-12 grid w-full grid-cols-1 gap-4 sm:gap-6 md:mb-15 xl:grid-cols-3">
			{services.map((service) => {
				const serviceSkills = skills.filter(
					(skill) => skill.serviceId === service.id
				);
				return (
					<ServiceCard
						key={service.id}
						title={service.title}
						Icon={
							service.id === "data-infrastructure"
								? FaDatabase
								: service.id === "web-development"
									? FaLaptopCode
									: service.id === "data-analytics"
										? IoAnalyticsSharp
										: RxReload
						}
						items={service.items}
						skills={serviceSkills}
					/>
				);
			})}
		</div>
	);
};

export default ServiceSection;
