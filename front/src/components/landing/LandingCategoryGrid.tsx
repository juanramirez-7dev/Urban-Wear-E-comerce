import { CategoryTile } from "./CategoryTile";
import primary1 from "../../assets/primary.png"
import secondary1 from "../../assets/secondary-1.png"
import secondary2 from "../../assets/secondary-2.png"


export function LandingCategoryGrid() {

  const categories = {
    primary :  {
      title: "Camisa Oversize",
      imageUrl: primary1,
      imageAlt: "Camisa Obersize Urban Wear de alta calidad",
      to: "/shop?categoriaId=02cefeb2-627e-4443-bea5-5f3dafe84456"
    },
    secondary: [
      {
        title: "Pantalones Cargo",
        imageUrl: secondary1,
        imageAlt: "Pantalon Cargo Urban Wear de alta calidad"  ,
        to: "/shop?categoriaId=f3b6f1dd-0df6-43cc-8c7d-55b93723061c"    
      },
      {
        title: "Chaquetas",
        imageUrl: secondary2 ,
        imageAlt: "Chaqueta Urban Wear de alta calidad",
        to: "/shop?categoriaId=48cc5175-ff1e-41b9-b1cc-0a428a87ba93"
      }
    ]
  }

  return (
    <section className="py-stack-lg px-margin-mobile md:px-margin-desktop">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter h-auto md:min-h-[700px]">
        <CategoryTile
          className="md:col-span-8 min-h-[360px] md:h-full"
          title={categories.primary.title}
          imageUrl={categories.primary.imageUrl}
          imageAlt={categories.primary.imageAlt}
          size="large"
          to={categories.primary.to}
        />
        <div className="md:col-span-4 flex flex-col gap-gutter">
          {categories.secondary.map((category) => (
            <CategoryTile
              key={category.title}
              className="flex-1 min-h-[220px] md:min-h-0"
              title={category.title}
              imageUrl={category.imageUrl}
              imageAlt={category.imageAlt}
              size="small"
              to={category.to}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
