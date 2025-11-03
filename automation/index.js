const axios = require("axios");

main()
async function main() {
    const search = "express"
    const results = await searchNpm(search);
    const packages = []

    for (const r of results) {
        let name = r.name;

        if (name.includes("/")) {
            name = name.split("/")
            name.shift();
            name = name.join("/");
        }

        if (name.startsWith(search)) packages.push(r.name)
    }

    console.log(packages.join(" "))
}

async function searchNpm(query, size = 500) {
    const res = await axios.get(`https://registry.npmjs.org/-/v1/search?text=${encodeURIComponent(query)}&size=${size}`);
    return res.data.objects.map(pkg => ({
        name: pkg.package.name,
        version: pkg.package.version,
        description: pkg.package.description,
        link: pkg.package.links.npm
    }));
}