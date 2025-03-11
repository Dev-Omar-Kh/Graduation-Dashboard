import React from 'react';
import { Bar, Pie, Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    PointElement,
    LineElement,
} from "chart.js";
import { useTranslation } from 'react-i18next';
import { Axios, getAllHomeData } from '../../API/API';
import { useQuery } from '@tanstack/react-query';
import StatisticLoading from './StatisticLoading';
import ChartsLoading from './ChartsLoading';
import StatisticError from './StatisticError';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    PointElement,
    LineElement
);

export default function Home() {

    const {t, i18n} = useTranslation();

    // ====== get-all-home-data ====== //

    const getApiData = async() => {
        const {data} = await Axios.get(getAllHomeData);
        return data
    }

    const { data, error, isLoading } = useQuery({queryKey: ["getAllHomeData"], queryFn: getApiData});

    console.log(data);

    // ====== statistics-data ====== //

    // const statisticsData = [

    //     {id: 1, title: 'totalViolationsWord', rate: 12.5, rateUp: true, num: 2547},
    //     {id: 2, title: 'detectedViolationsWord', rate: 8.2, rateUp: true, num: 1923},
    //     {id: 3, title: 'underInvestigationWord', rate: 3.1, rateUp: false, num: 624}

    // ];

    // ====== charts-data ====== //

    const pieData = {

        labels: [t("detectedWord"), t("underDetectedWord")],

        datasets: [
            {
                data: data?.pieData,
                backgroundColor: ["#305FA2", "#dee2e6"],
            },
        ],

    };

    const barData = {

        labels: [t("janMonth"), t("febMonth"), t("marMonth"), t("aprMonth"), t("mayMonth"), t("junMonth")],

        datasets: [
            {
                label: t("correctReportsWord"),
                data: data?.barData.correct,
                backgroundColor: "#305FA2",
            },
            {
                label: t("falseReportsWord"),
                data: data?.barData.false,
                backgroundColor: "#dee2e6",
            },
        ],

    };

    const lineData = {

        labels: [t("janMonth"), t("febMonth"), t("marMonth"), t("aprMonth"), t("mayMonth"), t("junMonth")],

        datasets: [
            {
                label: t("violationsWord"),
                data: data?.lineData,
                borderColor: "#305FA2",
                backgroundColor: "rgba(65, 105, 225, 0.2)",
                fill: true,
            },
        ],

    };

    const lineOptions = {
        responsive: true,
        maintainAspectRatio: false,
    };

    return <React.Fragment>

        <section className={`w-full ${error ? 'h-full' : ''} flex flex-col gap-5`}>

            {!isLoading && error && <StatisticError />}

            {!error && <div className='w-full grid grid-cols-3 gap-5 max-[880px]:grid-cols-2 max-[610px]:grid-cols-1'>

                {isLoading && Array.from({length: 3}).map((_, idx) => <StatisticLoading key={idx} />)}

                {data?.statisticsData.map(sta => <div key={sta.id} className='
                    p-5 rounded-md bg-[var(--white-color)] shadow-[0_0px_10px_var(--gray-color-3)]
                    flex flex-col gap-2.5
                '>

                    <div className='w-full flex items-center justify-between'>
                        <p className='text-base font-medium text-[var(--black-color)]'>{t(sta.title)}</p>
                        <p className={`
                            text-base font-normal ${sta.rateUp ? 'text-[var(--green-color)]' : 'text-[var(--red-color)]'}
                        `}>
                            {i18n.language === 'en' && `${sta.rateUp ? '+' : '-'}${sta.rate}%`}
                            {i18n.language === 'ar' && `${sta.rate}%${sta.rateUp ? '+' : '-'}`}
                        </p>
                    </div>

                    <h3 className='text-4xl font-medium'>{sta.num}</h3>

                    <p className='text-sm font-normal text-[var(--gray-color-2)]'>{t('lastDaysWord')}</p>

                </div>)}

            </div>}

            {!error &&<div className='w-full grid grid-cols-2 gap-5 max-[770px]:grid-cols-1'>

                <div className='
                    relative p-5 rounded-md bg-[var(--white-color)] shadow-[0_0px_10px_var(--gray-color-3)]
                    flex flex-col gap-2.5 overflow-hidden
                '>

                    {isLoading && <ChartsLoading />}

                    <h3 className="text-3xl font-medium mb-2">{t('violationsDistributionWord')}</h3>

                    <div className='max-h-80 m-auto flex items-center justify-center max-[770px]:h-fit  max-[770px]:w-full'>
                        <Pie data={pieData} />
                    </div>

                </div>

                <div className='
                    relative p-5 rounded-md bg-[var(--white-color)] shadow-[0_0px_10px_var(--gray-color-3)]
                    flex flex-col gap-2.5 overflow-hidden
                '>

                    {isLoading && <ChartsLoading />}

                    <h3 className="text-3xl font-medium mb-2">{t('reportAccuracyWord')}</h3>

                    <div className='w-full m-auto'>
                        <Bar data={barData} />
                    </div>

                </div>

                <div className='
                    relative p-5 rounded-md bg-[var(--white-color)] shadow-[0_0px_10px_var(--gray-color-3)]
                    flex flex-col gap-2.5 col-span-2 max-[770px]:col-span-1 overflow-hidden
                '>

                    {isLoading && <ChartsLoading />}

                    <h3 className="text-3xl font-medium mb-2">{t('violationTrendsWord')}</h3>

                    <div className='w-full h-80 m-auto'>
                        <Line data={lineData} options={lineOptions} />
                    </div>

                </div>

            </div>}

        </section>

    </React.Fragment>

}
