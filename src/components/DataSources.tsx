import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const DataSources = () => {
  const dataSources = [
    {
      category: "NASA Earth Data",
      sources: [
        { name: "MODIS Land Surface Temperature", type: "Temperature Analysis" },
        { name: "MODIS NDVI", type: "Vegetation Index" },
        { name: "SMAP Soil Moisture", type: "Resilience Mapping" },
        { name: "VIIRS Aerosol Optical Depth", type: "Air Quality" },
      ]
    },
    {
      category: "Climate & Weather",
      sources: [
        { name: "OpenWeather API", type: "Real-time Weather" },
        { name: "OpenAQ", type: "Air Quality Stations" },
      ]
    },
    {
      category: "Population & Demographics",
      sources: [
        { name: "WorldPop", type: "Population Density" },
        { name: "World Bank Open Data", type: "Demographics" },
        { name: "UN Statistics", type: "Urban Development" },
      ]
    }
  ];

  return (
    <section id="data" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-space">
            Trusted Data Sources
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our platform integrates authoritative datasets from leading space agencies and international organizations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {dataSources.map((category, index) => (
            <Card key={index} className="border-border/50">
              <CardHeader>
                <h3 className="text-xl font-semibold text-foreground font-space">
                  {category.category}
                </h3>
              </CardHeader>
              <CardContent className="space-y-4">
                {category.sources.map((source, sourceIndex) => (
                  <div key={sourceIndex} className="flex flex-col space-y-2">
                    <div className="font-medium text-foreground">
                      {source.name}
                    </div>
                    <Badge variant="secondary" className="w-fit text-xs">
                      {source.type}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-sm text-muted-foreground">
            All data is properly attributed and used in compliance with respective licensing agreements.
          </p>
        </div>
      </div>
    </section>
  );
};

export default DataSources;