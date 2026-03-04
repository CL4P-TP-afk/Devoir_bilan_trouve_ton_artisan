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
    <section className="steps-section py-4 my-5">
      <div className="container">

        <h2 className="steps-title h4 text-center mb-4">
          Comment trouver mon artisan ?
        </h2>

        <ol className="row g-4 list-unstyled m-0 p-0">

          {steps.map((step, index) => (
            <li className="col-12 col-md-6 col-lg-3" key={step.title}>

              <div className="d-flex align-items-start gap-2">

                <span className="steps-marker" aria-hidden="true" />

                <div>

                  <div className="steps-number">
                    Étape {index + 1}
                  </div>

                  <div className="steps-step-title">
                    {step.title}
                  </div>

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