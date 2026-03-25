import FAQCard from '../../../components/ui/FAQCard'
import styles from './Faq.module.css'

const FAQ_ITEMS = [
  {
    question: "L'autre personne a-t-elle besoin d'une application ?",
    answer:
      "Non. GoCard utilise la technologie NFC integree a 99 % des smartphones modernes. La personne touche votre carte et votre profil s'ouvre instantanement dans son navigateur. Aucune application, aucune configuration - ca fonctionne directement.",
  },
  {
    question: 'Puis-je modifier mon profil apres avoir partage ma carte ?',
    answer:
      'Oui. Vous pouvez mettre a jour vos liens, vos coordonnees et votre contenu a tout moment depuis votre tableau de bord, et les changements apparaissent instantanement partout ou votre carte est utilisee.',
  },
  {
    question: 'Livrez-vous a l’international ?',
    answer:
      "Oui. Nous livrons dans le monde entier avec suivi. Le delai de livraison depend de votre destination et du mode d'expedition selectionne.",
  },
  {
    question: "Puis-je ajouter le logo et les couleurs de mon entreprise ?",
    answer:
      "Absolument. Vous pouvez personnaliser le design de votre carte avec votre identite de marque et conserver une apparence professionnelle et coherente.",
  },
  {
    question: 'Que faire si je perds ma carte ?',
    answer:
      'Vous pouvez desactiver la carte perdue et en activer une de remplacement tout en conservant votre profil et vos liens existants.',
  },
]

export function Faq() {
  return (
    <section className={styles.section} id="faq" aria-labelledby="faq-heading" data-reveal>
      <div className={`${styles.textBlock} reveal-item`}>
        <p className={`${styles.label} reveal-item`}>QUESTIONS</p>
        <h2 id="faq-heading" className={`${styles.title} reveal-item`}>
          Reponses claires.
        </h2>
        <p className={`${styles.subtitle} reveal-item`}>
          Tout ce que vous devez savoir pour passer au niveau superieur dans votre networking.
        </p>
      </div>

      <div className={`${styles.cards} reveal-item`}>
        {FAQ_ITEMS.map((item, index) => (
          <FAQCard
            key={item.question + index}
            question={item.question}
            answer={item.answer}
            defaultOpen={index === 0}
          />
        ))}
      </div>
    </section>
  )
}
