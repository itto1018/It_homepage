"use client";

import React, { useEffect, useState } from "react";
import { ServiceCard } from "@/components/elements/ServiceCard";
import { FaDatabase, FaLaptopCode } from "react-icons/fa";
import { IoAnalyticsSharp } from "react-icons/io5";
import { RxReload } from "react-icons/rx";

import { getServices, getSkills } from "@/lib/firebase/store/services";

import type { Service, Skill } from "@/types/services";

interface Props {
	initialServices: Service[];
	initialSkills: Skill[];
}

const ServiceSection: React.FC<Props> = () => {
	const [isLoading, setIsLoading] = useState(true);

	// サービスを取得(Read)
	const [services, setServices] = React.useState<Service[]>([]);
	useEffect(() => {
		const fetchServices = async () => {
			try {
				const data = await getServices();
				setServices(data);
			} catch (error) {
				console.error("サービス情報取得エラー:", error);
			} finally {
				setIsLoading(false);
			}
		};
		fetchServices();
	}, []);

	// スキルを取得(Read)
	const [skills, setSkills] = React.useState<Skill[]>([]);
	useEffect(() => {
		const fetchSkills = async () => {
			try {
				const data = await getSkills();
				setSkills(data);
			} catch (error) {
				console.error("スキル情報取得エラー:", error);
			} finally {
				setIsLoading(false);
			}
		};
		fetchSkills();
	}, []);

	// ローディング中の表示
	if (isLoading) {
		return (
			<div className="flex h-64 items-center justify-center">
				<div className="h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600"></div>
			</div>
		);
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
