import { notFound } from "next/navigation";
import { PRODUCTS, PRODUCT_SLUGS } from "../../components/productsData";
import ProductDetail from "../../components/ProductDetail";

export function generateStaticParams() {
    return PRODUCT_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const data = PRODUCTS[slug];
    if (!data) return {};
    return {
        title: `${data.name} — ${data.stage.split("—")[0].trim()}`,
        description: data.tagline,
        alternates: { canonical: `/products/${slug}` },
    };
}

export default async function ProductPage({ params }) {
    const { slug } = await params;
    const data = PRODUCTS[slug];
    if (!data) notFound();
    return <ProductDetail data={data} />;
}
