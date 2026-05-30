import {useEffect, useState} from "react";
import {rawData} from "@/lib/data";
import {translateCert, translateExperience, translateProject} from "@/lib/translate";
import type {AppData, Lang} from "@/types";

export function useTranslation(lang: Lang): { data: AppData; translating: boolean } {
    const [data, setData] = useState<AppData>(rawData);
    const [translating, setTranslating] = useState(false);

    useEffect(() => {
        if (lang === "pt") {
            setData(rawData);
            setTranslating(false);
            return;
        }

        let current = true;
        setTranslating(true);

        Promise.all([
            Promise.all(rawData.projects.map((p) => translateProject(p, lang as "en" | "es"))),
            Promise.all(rawData.experiences.map((e) => translateExperience(e, lang as "en" | "es"))),
            Promise.all(rawData.certs.map((c) => translateCert(c, lang as "en" | "es"))),
        ]).then(([projects, experiences, certs]) => {
            if (current) {
                setData({projects, experiences, certs});
                setTranslating(false);
            }
        });

        return () => {
            current = false;
        };
    }, [lang]);

    return {data, translating};
}