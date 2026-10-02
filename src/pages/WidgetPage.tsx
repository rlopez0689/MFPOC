import UserWidget from "../components/UserWidget/UserWidget";

export default function WidgetPage() {
  return (
    <section className="widget-page">
      <div className="page-heading">
        <p className="kicker">Component preview</p>
        <h1>UserWidget</h1>
        <p>The card reads its user and tenant settings from App Context.</p>
      </div>
      <UserWidget />
    </section>
  );
}
