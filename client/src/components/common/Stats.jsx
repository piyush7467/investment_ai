const stats = [

    {value:"100+",label:"Companies"},

    {value:"24/7",label:"Market News"},

    {value:"5 sec",label:"AI Analysis"},

    {value:"95%",label:"Accuracy"}

];

const Stats=()=>{

    return(

        <section className="py-24">

            <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">

                {stats.map((item)=>(

                    <div
                        key={item.label}
                        className="bg-[#151A21] rounded-3xl border border-white/10 text-center p-10"
                    >

                        <h2 className="text-5xl font-bold text-emerald-400">

                            {item.value}

                        </h2>

                        <p className="mt-4 text-slate-400">

                            {item.label}

                        </p>

                    </div>

                ))}

            </div>

        </section>

    )

}

export default Stats;