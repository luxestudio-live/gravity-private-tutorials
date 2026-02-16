"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import React, { useEffect, useState } from "react"
import { Award, GraduationCap, Star, Users } from "lucide-react"
import { db } from "@/lib/firebase"
import { collection, getDocs } from "firebase/firestore"
import Image from "next/image"

type FacultyMember = {
	id?: string;
	name: string;
	subject: string;
	qualification: string;
	experience: string;
	specialization: string;
	achievements?: string[];
	image: string;
	color: string;
};

const defaultFaculty: FacultyMember[] = [
	{
		name: "Virendra Kumar Badgujar",
		subject: "",
		qualification: "",
		experience: "",
		specialization: "",
		achievements: [],
		image: "/Virendra Kumar Badgujar.jpeg",
		color: "from-primary to-accent",
	},
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
		name: "Jayant Pawar",
		subject: "Counsellor",
		qualification: "",
		experience: "",
		specialization: "",
		achievements: [],
		image: "/jayant.jpeg",
		color: "from-primary to-accent",
	},
	{
		name: "Rupesh Santosh Pawar",
		subject: "Administration Head",
		qualification: "M.Com (Management)",
		experience: "12 Years",
		specialization: "",
		achievements: [],
		image: "/rupesh.jpeg",
		color: "from-secondary to-primary",
	},
	{
		name: "Akshay Ramchandra Bhilare",
		subject: "Administration Head",
		qualification: "Bachelor in Accounting & Finance",
		experience: "12 Years",
		specialization: "",
		achievements: [],
		image: "/akshay.jpeg",
		color: "from-accent to-secondary",
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
		name: "Pankaj Vasant Rane",
		subject: "English",
		qualification: "B.A., B.Ed. (Eng.), TET & CTET qualified",
		experience: "21 Years",
		specialization: "",
		achievements: [],
		image: "/pankaj.jpeg",
		color: "from-accent to-secondary",
	},
	{
		name: "Pravin Devidas Thorat",
		subject: "Commerce Teacher",
		qualification: "M.Com, B.Ed, MBA, LLB",
		experience: "16 Years",
		specialization: "O.CM. // S.P",
		achievements: [],
		image: "/pravin-devidas-thorat.jpeg",
		color: "from-primary to-accent",
	},
	{
		name: "Arun Saheb Gauda",
		subject: "Accounts, Financial Studies, Economics",
		qualification: "B.Com (Account & Finance), M.Com (Accounts & Finance), M.Com (Management)",
		experience: "11 Years",
		specialization: "",
		achievements: [],
		image: "/arun-saheb-gauda.jpeg",
		color: "from-primary to-accent",
	},
	{
		name: "Ganesh Tulsiram Rathod",
		subject: "Maths",
		qualification: "BSc IT, MSc Math, MSc IT - Pursuing",
		experience: "9 Years",
		specialization: "",
		achievements: [],
		image: "/ganesh.jpeg",
		color: "from-primary to-accent",
	},
	{
		name: "Praveena Gelot",
		subject: "History",
		qualification: "D.El.Ed, B.A, B.Ed, M.A",
		experience: "6 Years",
		specialization: "",
		achievements: [],
		image: "/praveena.jpeg",
		color: "from-secondary to-primary",
	},
]

export default function FacultyPage() {
	const [allFaculty, setAllFaculty] = useState<FacultyMember[]>(defaultFaculty)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchFaculty = async () => {
			try {
				setLoading(true)
				const snap = await getDocs(collection(db, 'faculty'))
				const newFaculty = snap.docs.map((d) => ({ id: d.id, ...d.data() })) as FacultyMember[]
				console.log('Public page - Fetched new faculty from Firestore:', newFaculty)
				setAllFaculty([...defaultFaculty, ...newFaculty])
			} catch (error) {
				console.error('Error fetching faculty:', error)
				setAllFaculty(defaultFaculty)
			} finally {
				setLoading(false)
			}
		}

		fetchFaculty()
	}, [])

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
							<span>{allFaculty.length}+ Expert Educators</span>
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
					{loading ? (
						<div className="flex items-center justify-center py-20">
							<div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
						</div>
					) : (
						<>
							{allFaculty.length === 0 ? (
								<div className="text-center">
									<p className="text-muted-foreground">No faculty members found</p>
								</div>
							) : (
								<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
									{allFaculty.map((member, index) => (
									<div
										key={index}
										className="group relative bg-card rounded-3xl border border-border/50 hover:border-primary/50 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
									>
										{/* Image */}
										<div className="relative h-80 overflow-hidden bg-muted flex items-center justify-center">
											{member.image ? (
												<img
													src={member.image}
													alt={member.name}
													onError={(e) => {
														console.error(`Failed to load image for ${member.name}:`, member.image)
														e.currentTarget.src = "/placeholder.svg"
													}}
													className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ${
														member.name === "Sujeet Patil" ? "object-center" : "object-top"
													}`}
												/>
											) : (
												<div className="w-full h-full bg-muted-foreground/20 flex items-center justify-center">
													<Users className="w-12 h-12 text-muted-foreground" />
												</div>
											)}
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
									</div>
								</div>
							</div>
							))}
							</div>
							)}
						</>
					)}
				</div>
			</section>
			<Footer />
		</main>
	)
}
