export default function StepsSection() {
  const steps = [
    {
      title: "Choisir une catégorie",
      text: "Sélectionnez le domaine d’activité recherché.",
    },
    {
      title: "Rechercher un artisan",
      text: "Parcourez la liste ou utilisez la recherche par nom.",
    },
    {
      title: "Consulter la fiche",
      text: "Accédez aux informations détaillées de l’artisan.",
    },
    {
      title: "Contacter l’artisan",
      text: "Envoyez un message directement depuis le site.",
    },
  ];

  return (
    <section className="py-4 my-5" style={{ backgroundColor: "#F1F8FC" }}>
      <div className="container">
        <h2 className="h4 text-center mb-4" style={{ color: "#00497C"}}>Comment trouver mon artisan ?</h2>

        <ol className="row g-4 list-unstyled m-0 p-0">
          {steps.map((step, index) => (
            <li className="col-12 col-md-6 col-lg-3" key={step.title}>
              <div className="d-flex align-items-start gap-2">
                {/* marqueur carré bleu */}
                <span
                  aria-hidden="true"
                  style={{
                    width: 12,
                    height: 12,
                    marginTop: 6,
                    backgroundColor: "#0074C7",
                    display: "inline-block",
                  }}
                />

                <div>
                  <div style={{ color: "#0074C7", fontWeight: 600 }}>
                    Étape {index + 1}
                  </div>

                  <div style={{ fontWeight: 700 }}>{step.title}</div>

                  <p className="mb-0">{step.text}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}