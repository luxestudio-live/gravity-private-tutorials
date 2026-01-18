"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import React from "react"
import { Award, GraduationCap, Star, Users } from "lucide-react"

type FacultyMember = {
	name: string;
	subject: string;
	qualification: string;
	experience: string;
	specialization: string;
	achievements: string[];
	image: string;
	color: string;
};

const facultyList: FacultyMember[] = [
	{
		name: "Ramkrishna Badgujar",
		subject: "English",
		qualification: "MA B.Ed - English",
		experience: "",
		specialization: "",
		achievements: [],
		image: "/ramkrishna-badgujar.jpeg",
		color: "from-secondary to-primary",
	},
	{
		name: "Sujeet Patil",
		subject: "Marathi, Hindi",
		qualification: "MA B.Ed Marathi Hindi",
		experience: "",
		specialization: "",
		achievements: [],
		image: "/sujeet-patil.png",
		color: "from-accent to-secondary",
	},
	{
		name: "Pratik Sawant",
		subject: "English, S.S",
		qualification: "D.Ed",
		experience: "",
		specialization: "",
		achievements: [],
		image: "/pratik-sawant.jpeg",
		color: "from-accent to-secondary",
	},
	{
		name: "Pravin Devidas Thorat",
		subject: "Commerce Teacher",
		qualification: "M.Com, B.Ed, MBA, LLB",
		experience: "16 Years",
		specialization: "O.CM. / S.P",
		achievements: [],
		image: "/pravin-devidas-thorat.jpeg",
		color: "from-primary to-accent",
	},
	{
		name: "Santosh Gopal Sawant",
		subject: "",
		qualification: "",
		experience: "",
		specialization: "",
		achievements: [],
		image: "/santosh-gopal-sawant.jpeg",
		color: "from-secondary to-primary",
	},
	{
		name: "Arun Saheb Gauda",
		subject: "Accounts, Financial Studies, Economics",
		qualification: "B.Com (Account & Finance), M.Com (Accounts & Finance), M.Com (Management)",
		experience: "11 Years",
		specialization: "",
		achievements: [],
		image: "/arun-saheb-gauda.jpg",
		color: "from-primary to-accent",
	},
]

export default function FacultyPage() {
	return (
		<main className="min-h-screen">
			<Navbar />
			{/* Hero Section */}
			<section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden pt-20">
				<div className="absolute inset-0 -z-10">
					<div className="absolute top-20 left-10 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" />
					<div
						className="absolute bottom-20 right-10 w-80 h-80 bg-accent/20 rounded-full blur-3xl animate-float"
						style={{ animationDelay: "2s" }}
					/>
				</div>
				<div className="container mx-auto px-4 lg:px-8 py-12">
					<div className="max-w-4xl mx-auto text-center space-y-6">
						<div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium border border-primary/20">
							<Users className="w-4 h-4" />
							<span>50+ Expert Educators</span>
						</div>
						<h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance leading-tight">
							Meet Our
							<span className="block mt-2 text-primary">Expert Faculty</span>
						</h1>
						<p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed">
							Experienced educators dedicated to nurturing excellence and shaping
							futures
						</p>
					</div>
				</div>
			</section>
			{/* Faculty Grid */}
			<section className="py-16 lg:py-20">
				<div className="container mx-auto px-4 lg:px-8">
					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
						{facultyList.map((member, index) => (
							<div
								key={index}
								className="group relative bg-card rounded-3xl border border-border/50 hover:border-primary/50 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 animate-scale-in"
								style={{ animationDelay: `${index * 100}ms` }}
							>
								{/* Gradient Overlay */}
								<div
									className={`absolute inset-0 bg-gradient-to-br ${member.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
								/>
								{/* Image */}
								<div className="relative h-64 overflow-hidden bg-muted">
									<img
										src={member.image || "/placeholder.svg"}
										alt={member.name}
										className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
								</div>
								<div className="relative z-10 p-8 -mt-12">
									{/* Badge */}
									<div
										className={`inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r ${member.color} text-white rounded-lg text-sm font-medium mb-4 shadow-lg`}
									>
										<Award className="w-4 h-4" />
										<span>{member.experience}</span>
									</div>
									{/* Name & Subject */}
									<h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
										{member.name}
									</h3>
									<p className="text-primary font-semibold mb-4">
										{member.subject}
									</p>
									{/* Qualification */}
									<div className="space-y-3 mb-4">
										<div className="flex items-start gap-2">
											<GraduationCap className="w-4 h-4 text-accent mt-1 flex-shrink-0" />
											<span className="text-sm text-foreground/80">
												{member.qualification}
											</span>
										</div>
										<div className="flex items-start gap-2">
											<Star className="w-4 h-4 text-secondary mt-1 flex-shrink-0" />
											<span className="text-sm text-foreground/80">
												{member.specialization}
											</span>
										</div>
									</div>
									{/* Achievements */}
									<div className="pt-4 border-t border-border/50">
										<h4 className="text-xs font-semibold text-muted-foreground uppercase mb-3">
											Key Achievements
										</h4>
										<div className="space-y-2">
											{member.achievements.map((achievement, idx) => (
												<div key={idx} className="flex items-start gap-2">
													<div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 flex-shrink-0" />
													<span className="text-sm text-foreground/80">
														{achievement}
													</span>
												</div>
											))}
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>
			<Footer />
		</main>
	)
}
