var input1;
var predicted_class;

const classes = {
  "Pepper Bell - Bacterial_spot": 0,
  "Pepper Bell - Healthy": 1,
  "Potato - Early Blight": 2,
  "Potato - Late Blight": 3,
  "Potato - Healthy": 4,
  "Tomato - Bacterial Spot": 5,
  "Tomato - Early Blight": 6,
  "Tomato - Late Blight": 7,
  "Tomato - Leaf Mold": 8,
  "Tomato - Septoria Leaf Spot": 9,
  "Tomato - Two Spotted Spider Mite": 10,
  "Tomato - Target Spot": 11,
  "Tomato - Tomato Yellow Leaf Curl Virus": 12,
  "Tomato - Tomato Mosaic Virus": 13,
  "Tomato - Healthy": 14,
};

const causes = {
  "Bacterial spot is caused by Xanthomonas campestris pv. vesicatoria and is the most common and destructive disease for peppers.": 0,
  "The pepper-bell plant is healthy.": 1,
  "Early blight is caused by the fungus Alternaria solani. The disease primarily affects leaves and stems, but under favorable weather conditions, and if left uncontrolled, it can result in considerable defoliation and enhance the chance for tuber infection. Premature defoliation may lead to a reduction in yield.": 2,
  "Late blight, also called potato blight, caused by Phytophthora infestans is an oomycete or water mold, a fungus-like microorganism. The disease occurs in humid regions with temperatures ranging between 4 and 29 °C (40 and 80 °F). Hot and dry weather checks its spread. Potato plants that are infected may rot within two weeks.": 3,
  "The potato plant is healthy.": 4,
  "The bacterial spot of tomato is caused by Xanthomonas vesicatoria, Xanthomonas euvesicatoria, Xanthomonas gardneri, and Xanthomonas perforans. These bacterial pathogens can enter a garden on contaminated seed and transplants, which may or may not show symptoms.": 5,
  "Early blight of tomato is caused primarily by the fungus Alternaria linariae (=A. tomatophila, formerly known as A. solani). The disease primarily affects leaves and stems, but under favorable weather conditions, and if left uncontrolled, it can result in considerable defoliation and enhance the chance for tuber infection. Premature defoliation may lead to a reduction in yield.": 6,
  "Late blight of tomato is caused by the oomycete pathogen Phytophthora infestans (P. infestans). It favors cool (40°F to 80°F) and damp conditions. Prolonged hot and dry days can halt pathogen spread.": 7,
  "Leaf mold is caused by the fungus Passalora fulva (previously called Fulvia fulva or Cladosporium fulvum). It is not known to be pathogenic on any plant other than tomato.": 8,
  "Septoria leaf spot is caused by the fungus Septoria lycopersici. This fungus can attack tomatoes at any stage of development.": 9,
  "Two-spotted spider mite disease is caused by the two-spotted spider mite (Tetranychus urticae), the most common mite species that attack tomatoes.": 10,
  "The target spot is caused by the fungus Corynespora cassiicola. Target spot is frequently misdiagnosed in its early stages as symptoms are difficult to recognize and can be confused with bacterial spot and early blight.": 11,
  "TYLCV disease is caused by Tomato Yellow Leaf Curl Virus, is transmitted by an insect vector from the family Aleyrodidae and order Hemiptera, the whitefly Bemisia tabaci, commonly known as the Silverleaf whitefly or the sweet potato whitefly.": 12,
  "ToMV is caused by Tomato mosaic virus, which can overwinter on perennial weeds and is then spread by several insects including aphids, leafhoppers, whiteflies, and cucumber beetles. Both cuttings and divisions from infected plants will be infected. The disease spreads into the plant via minor wounds caused by mechanical injury, insect chewing, and grafting. Leftover plant debris is the most common contagion.": 13,
  "The tomato plant is healthy.": 14,
};

const symptoms = {
  "Bacterial spot disease symptoms can appear throughout the above-ground portion of the plant, which may include leaf spot, fruit spot, and stem canker. However, early symptoms show up as water-soaked lesions on leaves that can quickly change from green to dark brown and enlarge into spots that are up to 1/4 inch in diameter with slightly raised margins. Over time, these spots can dry up in less humid weather, which allows the damaged tissues to fall off, resulting in a tattered appearance on the affected leaves.": 0,
  "There are no symptoms as the pepper bell plant is healthy.": 1,
  "Early blight disease symptoms appear first on the oldest foliage. Diseased leaves have circular to angular dark brown lesions 0.12 to 0.16 inches (3 – 4 mm) in diameter. Concentric rings often form in lesions to produce a characteristic target-board effect. Severely infected leaves turn yellow and drop. Infected tubers show a brown corky dry rot.": 2,
  "Late blight disease symptoms will first appear as water-soaked spots, usually at the tips or edges of lower leaves where water or dew tends to collect. In moist and cool conditions, water-soaked spots rapidly enlarge and a broad yellow halo may be seen surrounding the lesion. On the underside of a leaf, a spore-producing zone of white moldy growth approximately 0.1 - 0.2 inches wide may appear at the border of the lesion. In wet conditions, the disease progress rapidly, and warm, dry weather will slow or stop disease development. As conditions become moist and cool, disease development resumes. Tuber lesions first appear as irregular, dark blotches. When cut open, the affected tissue is water-soaked, reddish-brown, and extends with an irregular margin into the tuber flesh. Lesions may start as superficial decay that continues to develop after tubers are harvested and placed into storage. Older lesions may become firm and sunken due to water loss and tubers will appear shriveled.": 3,
  "There are no symptoms as the potato plant is healthy.": 4,
  "Bacterial spot disease develops on seedlings and mature plants. On seedlings, infections may cause severe defoliation.  Leaf spots turn from yellow or light green to black or dark brown. Older spots are black, slightly raised, superficial, and measure up to 0.3 inches (7.5 mm) in diameter. Larger leaf blotches may also occur, especially on the margins of leaves. Symptoms on immature fruit are shown as slightly sunken and surrounded by a water-soaked halo, which soon disappears. Bacterial spots on fruits enlarge, turn brown, and become scabby.": 5,
  "Early blight disease symptoms are small dark spots that form on older foliage near the ground. Leaf spots are round, brown, and can grow up to 1/2 inch in diameter. Larger spots have target-like concentric rings. The tissue around spots often turns yellow. Stem infections on older plants are oval to irregular, dry brown areas with dark brown concentric rings. Fruit spots are leathery and black, with raised concentric ridges. They generally occur near the stem. Infected fruit may drop from the plant.": 6,
  "Late blight disease symptoms are large, dark brown blotches on leaves with a green-gray edge, not confined by major leaf veins. Infections progress through leaflets and petioles, resulting in large sections of dry brown foliage. Stem infections are firm and dark brown with a rounded edge. In cool and wet weather, entire fields turn brown and wilted as if hit by frost.": 7,
  "Leaf mold disease symptoms are pale greenish-yellow spots, usually less than 1/4 inch, with no definite margins, form on the upper sides of leaves. Olive-green to brown velvety mold forms on the lower leaf surface below leaf spots. Leaf spots will grow together and turn brown. Leaves will wither and die but often remain attached to the plant. Infected blossoms turn black and fall off. Fruit infections start as a smooth black irregular area on the stem end of the fruit. As the disease progress, the infected area becomes sunken, dry, and leathery.": 8,
  "Septoria leaf spot disease's first symptoms appear as small, water-soaked, circular spots 1/16 to 1/8 inches in diameter on the undersides of older leaves. The centers of these spots then turn gray to tan and have a dark-brown margin. The spots are distinctively circular and are often quite numerous. As the spots age, they sometimes enlarge and often coalesce. A diagnostic feature of this disease is the presence of many dark-brown, pimple-like structures called pycnidia (fruiting bodies of the fungus) that are readily visible in the tan centers of the spots. When spots are numerous, affected leaves turn yellow and eventually shrivel up, brown, and drop off.": 9,
  "Two-spotted spider mite disease symptoms have mite-infested plants may turn yellow and dry up, and plants may lose vigor and die when infestations are severe. The undersides of affected leaves appear tan or yellow and have a crusty texture. Heavy infestations of the two‑spotted spider mite produce fine webbing that may cover the entire plant. Mites are identified by shaking symptomatic leaves onto a sheet of white paper or by observing infected leaf areas with a hand lens. In hot and dry weather, mites can cause plants to drop leaves in a few weeks. Fruit from severely infested plants is often unmarketable because defoliated plants tend to yield small, poor quality fruit.": 10,
  "Target spot disease symptoms have irregular-shaped spots (less than 1 mm) with a yellow margin. Some of the spots enlarge up to 10 mm and show characteristics rings. Spread to all leaflets and other leaves is rapid, causing the leaves to turn yellow, collapse, and die. Spots also occur on the stems. They are long and thin. Small light brown spots with dark margins may occur on the fruit. The spores are spread by wind-blown rain, and if wind and wet weather continue for a few days, the spread is fast, then plants lose their leaves quickly.": 11,
  "Tomato Yellow Leaf Curl Virus disease symptoms initially show stunted and erect or upright plant growth and plants infected at an early stage of growth will show severe stunting. Leaves of infected plants are small and curl upward and show strong crumpling and interveinal and marginal yellowing. The internodes of infected plants become shortened with stunted growth. Plants often take on a bushy appearance. Flowers formed on infected plants commonly do not develop and fall off. Fruit production is reduced when plants are infected.": 12,
  "ToMV symptoms show mottling, with alternating yellowish and darker green areas, the latter often appearing thicker and raised gives a blister-like appearance. The leaves tend to be fern-like in appearance with pointed tips and younger leaves may be twisted. The fruit may be distorted, yellow blotches and necrotic spots may occur on both ripe and green fruit and there may be internal browning of the fruit wall. In young plants, the infection reduces the set of fruit and may cause distortions and blemishes. The entire plant may be dwarfed and the flowers discolored. Environmental conditions influence the symptoms. These include temperature, day length, and light intensity as well as the variety, the age of the plant at infection, and the virulence of the strain of ToMV.": 13,
  "There are no symptoms as the tomato plant is healthy.": 14,
};

const treatments = [
  [
    "Washing seeds for 40 minutes in diluted Clorox (two parts Clorox plus eight parts water).",
    "Seed treatment with hot water, soaking seeds for 30 minutes in water pre-heated to 125 F/51 C.",
    "Organic growers should use a combination of copper and Regalia sprays. Apply on a 7 to 10 days schedule, use the shorter interval when rain, high humidity, and warm temperatures occur and the longer in case of dry weather.",
    "In the field, use at least a three-year rotation because the pathogen can survive in infested crop debris until it completely decomposes",
  ],
  ["There is no need for treatment as the plant is healthy."],
  [
    "Plant more potato varieties that are resistant to the disease, late maturing is more resistant than early maturing varieties.",
    "Avoid overhead irrigation and allow for sufficient aeration between plants to allow the foliage to dry as quickly as possible. Practice a 2-year crop rotation (Do not replant potatoes or other crops in this family for 2 years after a potato crop has been harvested).",
    "Keep the potato plants healthy and stress-free by providing adequate nutrition and sufficient irrigation, especially later in the growing season after flowering when plants are most susceptible to the disease.",
    "Only dig the tubers up when they are completely mature to prevent damaging them. Any damage done at harvest can additionally facilitate the disease.",
    "Remove plant debris and weed hosts at the end of the season to mitigate areas where the disease may overwinter.",
  ],
  [
    "Use a seed piece fungicide treatment labeled for control of late blight. Recommended seed treatments include Revus, Reason, and mancozeb.",
    "Eliminate sources of inoculum such as hairy nightshade weed species and diseased potatoes.",
    "Destroy all culled and diseased potatoes.",
    "Quickly destroy hot spots of late blight.",
    "Kill vines completely two to three weeks before harvest.",
    "Applying phosphorous acid to potatoes after harvest and before piling can prevent infection and the spread of late blight in storage.",
    "Monitor home gardens and market tomatoes near you for late blight. Late blight can move from these local sources to potato fields.",
  ],
  ["There is no need for treatment as the plant is healthy."],
  [
    "Cultural practices and preventive sprays of copper help to manage bacterial spots.",
    "Using pathogen-free seeds and disease-free transplants, when possible, is the best way to avoid bacterial spots on tomatoes. Avoiding sprinkler irrigation and cull piles near greenhouse or field operations, and rotating with a nonhost crop also help control the disease.",
    "Cultural controls and some copper formulations are acceptable for use on organically certified produce.",
    "Copper-containing bactericides provide partial disease control. Apply at the first sign of disease and repeat at 10 to 14-day intervals when warm, moist conditions prevail. Copper is strictly a protectant and must be applied before an infection occurs. Copper resistance has been observed, but can be somewhat overcome by combining copper with mancozeb.",
  ],
  [
    "Tomatoes have early blight that requires immediate attention before the disease takes over the plants. Thoroughly spray the plant (including bottoms of leaves )with Bonide Liquid Copper Fungicide concentrate or Bonide Tomato & Vegetable. Both of these treatments are organic.",
    "A day after treatment, remove the lower branches with a sharp razor blade knife. Clean your knife with rubbing alcohol before trimming the next plant to prevent the spread of the disease. Repeat fungicide treatments every 7 to 14 days.",
    "Read the fungicide label instructions carefully before using.",
    "Do not spray pesticides, fungicides, fertilizers, or herbicides at a high temperature, as you can damage your plants. Water your plants the day before spraying. Hydration is important!.",
  ],
  [
    "Tomato varieties resistant to certain races of the late blight fungus are grown where the disease occurs regularly.",
    "Remove any nearby diseased tomato plants and nightshades.",
    "Check transplants to ensure they are free of late blight before planting.",
    "Avoid sprinkler irrigation, if possible, because it favors the development of late blight.",
    "Fungicides are generally needed only if the disease appears during a time of year when rain is likely or overhead irrigation is practiced.",
    "Disc tomato fields in fall to eliminate a winter reservoir for the fungus.",
  ],
  [
    "If you observe symptoms in the greenhouse, remove the diseased plants and surrounding plants to prevent pathogen spread. Dispose of infected plant material and sterilize all equipment used in that greenhouse.",
    "Nutrients and disease pressures can build up in high tunnels, so rotate crops and move tunnels regularly.",
    "Make sure the seed is clean and purchased from a reputable source.",
    "Use drip irrigation and avoid watering foliage.",
    "Keep the night temperature in the greenhouse higher than the outside temperature to avoid dew formation on the foliage.",
    "Remove crop residue at the end of the season. Burn it or bury it away from tomato production areas.",
  ],
  [
    "If the disease is caught early, the lower infected leaves can be removed and burned or destroyed. However, removing leaves above where the fruit has formed will weaken the plant and expose the fruit to sunscald. At the end of the season, collect all foliage from infected plants and dispose of or bury it. Do not compost diseased plants.",
    "Mulching will reduce splashing soil, which may contain fungal spores associated with debris. Apply mulch after the soil has warmed.",
    "Overhead watering facilitates infection and spreads the disease. Use a soaker hose at the base of the plant to keep the foliage dry. Water early in the day.",
    "Use crop rotation(Next year do not plant tomatoes in the location where diseased tomatoes grew. Wait 1–2 years before replanting tomatoes in these areas).",
  ],
  [
    "Avoid weedy fields and do not plant eggplant adjacent to legume forage crops.",
    "Do not over-fertilize.",
    "Overhead irrigation or prolonged periods of rain can help reduce populations.",
    "Apply a pesticide specific to mites called a miticide. Ideally, start treating for two-spotted mites before your plants are seriously damaged. Apply the miticide for control every 7 days or so. Since mites can develop resistance to chemicals, switch to another type of miticide after three applications.",
  ],
  [
    "Remove a few branches from the lower part of the plants to allow better airflow at the base.",
    "Remove and burn the lower leaves as soon as the disease appears, especially after the lower fruit trusses have been picked.",
    "Keep plots free from weeds, as some may be hosts of the fungus.",
    "Do not use overhead irrigation, otherwise, it will create conditions for spore production and infection.",
    "Collect and burn as much of the crop as possible when the harvest is complete.",
    "Practice crop rotation, leaving 3-years before replanting tomatoes on the same land.",
  ],
  [
    "Inspect plants for whitefly infestations two times per week. If whiteflies are beginning to appear, spray with azadirachtin (Neem), pyrethrin, or insecticidal soap. For more effective control, it is recommended that at least two of the above insecticides be rotated at each spraying. Follow label directions closely for dosage rates, spray intervals, and precautions. Spray the undersides of the leaves thoroughly.",
    "Symptomatic plants should be carefully covered by a clear or black plastic bag and tied at the stem at the soil line. Cut off the plant below the bag and allow the bag with plant and whiteflies to desiccate to death on the soil surface for 1-2 days before placing the plant in the trash. Do not cut the plant off or pull it out of the garden and toss it on the compost! The goal is to remove the plant reservoir of virus from the garden and to trap the existing virus-bearing whiteflies so they do not disperse onto other tomatoes.",
    "Use a neonicotinoid insecticide, such as dinotefuran (Venom) imidacloprid (AdmirePro, Alias, Nuprid, Widow, and others), or thiamethoxam (Platinum), as a soil application or through the drip irrigation system at transplanting of tomatoes.",
  ],
  [
    "Once plants are infected, there is no cure for mosaic viruses. Because of this, prevention is key! However, if plants in your garden do show symptoms of having mosaic viruses, here's how to minimize the damage:",
    "Remove all infected plants and destroy them. Do not put them in the compost pile, as the virus may persist in infected plant matter. Burn infected plants or throw them out with the garbage.",
    "Monitor the rest of your plants closely, especially those located near infected plants.",
    "Disinfect gardening tools after every use. Keep a bottle of a weak bleach solution or another antiviral disinfectant to wipe your tools.",
    "Plant virus-resistant varieties in your garden.",
    "Mosaic viruses are mostly spread by insects, especially aphids and leafhoppers. You can try covering your plants with a floating row cover or aluminum foil mulches to prevent these insects from infecting your plant.",
    "Control your weeds. Some types may serve as hosts for the disease, and when aphids and other insects feed on these plants, they will spread the viruses to your garden plants.",
    "To avoid seed-borne mosaic viruses, soak seeds of susceptible plants in a 10% bleach solution before planting.",
  ],
  ["There is no need for treatment as the plant is healthy."],
];

function getKeyByValue(object, value) {
  return Object.keys(object).find((key) => object[key] === value);
}

// const predictbtn = document.querySelector("#hidebtn");
// predictbtn.addEventListener("click", function () {
//     console.log("Predicted class from btn: " + predicted_class);
// });

const image_input1 = document.querySelector("#imageFile");
image_input1.addEventListener("change", function () {
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    const uploaded_image = reader.result;
    input1 = uploaded_image;
    loadModelAndPredict(input1);
    // document.querySelector("#display_image").style.backgroundImage = `url(${uploaded_image})`;
  });
  reader.readAsDataURL(this.files[0]);
});

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = src;
    img.onload = () => resolve(tf.browser.fromPixels(img));
    img.onerror = (err) => reject(err);
  });
}

function resizeImage(image) {
  return tf.image.resizeBilinear(image, [224, 224]);
}

function batchImage(image) {
  // Expand our tensor to have an additional dimension, whose size is 1
  const batchedImage = image.expandDims(0);
  // Turn pixel data into a float between 0 and 1.
  return batchedImage.toFloat().div(tf.scalar(255));
}

function loadAndProcessImage(image) {
  const resizedImage = resizeImage(image);
  console.log(image);
  const batchedImage = batchImage(resizedImage);
  return batchedImage;
}

function loadModelAndPredict(image) {
  tf.loadLayersModel("./model.json").then((pretrainedModel) => {
    loadImage(image).then((img) => {
      const processedImage = loadAndProcessImage(img);
      const prediction = pretrainedModel.predict(processedImage);
      // Because of the way Tensorflow.js works, you must call print on a Tensor instead of console.log.
      prediction.print();
      const result = prediction.as1D().argMax().dataSync()[0];
      console.log(result);
      predicted_class = getKeyByValue(classes, result);
      console.log(predicted_class);
      document.querySelector("#hidebtn").innerHTML = "Predict";
      document.querySelector("#hidebtn").style.pointerEvents = "all";

      document.querySelector("#prediction").innerHTML = predicted_class;
      document.querySelector("#disease_display").innerHTML = predicted_class;
      document.querySelector("#cause").innerHTML = getKeyByValue(
        causes,
        result
      );
      document.querySelector("#symptom").innerHTML = getKeyByValue(
        symptoms,
        result
      );
      const treat = document.querySelector("#treatment");
      treat.innerHTML = "";
      const treat_res = treatments[result];
      const ul = document.createElement("ul");
      treat.appendChild(ul);
      for (let i = 0; i < treat_res.length; i++) {
        const li = document.createElement("li");
        li.innerHTML = treat_res[i];
        ul.appendChild(li);
      }
    });
  });
}
