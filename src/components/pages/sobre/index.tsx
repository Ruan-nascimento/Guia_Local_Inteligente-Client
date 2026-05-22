import { AboutIntro } from "@/components/about/aboutIntro";
import { ArchitectureList } from "@/components/about/arquitetureList";
import { DevelopersCard } from "@/components/about/developersCard";
import { FeatureList } from "@/components/about/featureList";
import { SectionTitle } from "@/components/about/sectionTitle";
import { TechStack } from "@/components/about/techStack";
import { Header } from "@/components/header";
import type { ScreenState } from "@/interfaces/screenState.interface";


export const SobrePage = ({setScreenState}: {setScreenState: (s: ScreenState) => void}) => {
    return (
        <div className="min-h-dvh bg-gray-950 text-white">
            <Header setScreenState={setScreenState}/>

            <main className="px-6 pb-32 pt-10">
                <section className="mx-auto flex max-w-5xl flex-col gap-8">
                    <div>
                        <h1 className="text-4xl font-bold tracking-tight">
                            Sobre
                        </h1>
                    </div>

                    <AboutIntro />

                    <section>
                        <SectionTitle title="Tecnologias" />
                        <TechStack />
                    </section>

                    <section>
                        <SectionTitle title="Arquitetura" />
                        <ArchitectureList/>
                    </section>

                    <section>
                        <SectionTitle title="Funcionalidades" />
                        <FeatureList />
                    </section>

                    <section>
                        <SectionTitle title="Desenvolvido por" />
                        <DevelopersCard />
                    </section>
                </section>
            </main>
        </div>
    );
};