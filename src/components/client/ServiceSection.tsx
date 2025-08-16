"use client";

import Loading from "@/components/common/Loading";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { ServiceCard } from "@/components/client/ServiceCard";
import { getServices, getSkills } from "@/lib/firebase/store/services";
import { FaDatabase, FaLaptopCode } from "react-icons/fa";
import { IoAnalyticsSharp } from "react-icons/io5";
import { RxReload } from "react-icons/rx";
import type { Service, Skill } from "@/types/services";

const ServiceSection = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [services, setServices] = useState<Service[]>([]);
	const [skills, setSkills] = useState<Skill[]>([]);

	// サービスを取得(Read)
	useEffect(() => {
		const fetchServices = async () => {
			try {
				const data = await getServices();
				setServices(data);
			} catch (error) {
				console.error("サービス情報取得エラー:", error);
				toast.error("サービス情報の取得に失敗しました");
			} finally {
				setIsLoading(false);
			}
		};
		fetchServices();
	}, []);

	// スキルを取得(Read)
	useEffect(() => {
		const fetchSkills = async () => {
			try {
				const data = await getSkills();
				setSkills(data);
			} catch (error) {
				console.error("スキル情報取得エラー:", error);
				toast.error("スキル情報の取得に失敗しました");
			} finally {
				setIsLoading(false);
			}
		};
		fetchSkills();
	}, []);

	// サービスの表示順
	const serviceOrder = [
		"data-infrastructure",
		"web-development",
		"data-analytics",
	];

	// ローディング中の表示
	if (isLoading) {
		return <Loading />;
	}

	return (
		<div className="mb-12 grid w-full grid-cols-1 gap-4 sm:gap-6 md:mb-15 xl:grid-cols-3">
			{services
				.sort((a, b) => {
					const indexA = serviceOrder.indexOf(a.id);
					const indexB = serviceOrder.indexOf(b.id);
					return indexA - indexB;
				})
				.map((service) => {
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
