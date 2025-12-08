import React from "react";

const images = [
    { src: "https://i.ibb.co.com/9HZq7wcb/dessert-creme-brulee-with-figs-currants-orange-tray-light-stone-background-autumn-composition.jpg", name: "Crème Brûlée with Figs" },
    { src: "https://i.ibb.co.com/zhKKXNFz/shah-pilaf-with-dried-fruits-human-hand-round-plate.jpg", name: "Shah Pilaf" },
    { src: "https://i.ibb.co.com/607yjdP5/sweet-dessert-pancake-with-banana-sweet-sauce.jpg", name: "Banana Pancake" },
    { src: "https://i.ibb.co.com/j7j0XGG/top-view-lemon-tart-plate.jpg", name: "Lemon Tart" },
    { src: "https://i.ibb.co.com/35JxLYkh/top-view-peach-jam-with-whipped-cream-walnut-mint-black-tea-pear-shape-glass.jpg", name: "Peach Jam & Cream" },
];

export default function SignatureMeals() {
    return (
        <section className="py-16 bg-white">
            <div className="max-w-5xl mx-auto px-4 text-center">
                <h3 className="text-2xl font-bold text-green-700 mb-8">Signature Meals</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {images.map((img, i) => (
                        <div key={i} className="bg-green-50 rounded-lg shadow p-4 flex flex-col items-center">
                            <img
                                src={img.src}
                                alt={img.name}
                                className="w-full h-48 object-cover rounded mb-4"
                                loading="lazy"
                            />
                            <p className="text-green-700 font-semibold">{img.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
