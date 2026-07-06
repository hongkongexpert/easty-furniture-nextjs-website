import { Mail, MapPin, PackageCheck, Phone, Send, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { categoryLabel, t } from "@/lib/i18n";
import { getLocale } from "@/lib/i18n-server";

export default async function ContactPage() {
  const locale = await getLocale();
  const dictionary = t(locale);
  const contact = dictionary.contact;
  return (
    <main className="container pt-32 pb-stack-lg">
      <section className="mb-stack-lg">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-primary">{contact.eyebrow}</p>
        <h1 className="mb-stack-sm text-5xl font-bold leading-[56px]">{contact.title}</h1>
        <p className="max-w-3xl text-base leading-6 text-muted-foreground">{contact.text}</p>
      </section>

      <section className="grid gap-gutter lg:grid-cols-12">
        <Card className="lg:col-span-8">
          <CardContent className="p-8">
            <h2 className="mb-8 text-2xl font-semibold leading-8">{contact.formTitle}</h2>
            <form className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Field label={contact.fields[0]}><Input placeholder={contact.placeholders[0]} required /></Field>
                <Field label={contact.fields[1]}><Input placeholder={contact.placeholders[1]} /></Field>
                <Field label={contact.fields[2]}><Input type="email" placeholder={contact.placeholders[2]} required /></Field>
                <Field label={contact.fields[3]}><Input placeholder={contact.placeholders[3]} /></Field>
                <Field label={contact.fields[4]}><Input placeholder={contact.placeholders[4]} /></Field>
                <Field label={contact.fields[5]}><Select><SelectTrigger><SelectValue placeholder={contact.placeholders[5]} /></SelectTrigger><SelectContent><SelectItem value="office">{categoryLabel(locale, "Office Furniture")}</SelectItem><SelectItem value="education">{categoryLabel(locale, "Educational Furniture")}</SelectItem><SelectItem value="hotel">{categoryLabel(locale, "Hotel Furniture")}</SelectItem><SelectItem value="display">{categoryLabel(locale, "Display Furniture")}</SelectItem></SelectContent></Select></Field>
              </div>
              <Field label={contact.fields[6]}><Input placeholder={contact.placeholders[6]} /></Field>
              <Field label={contact.fields[7]}><Input placeholder={contact.placeholders[7]} /></Field>
              <Field label={contact.fields[8]}><Textarea placeholder={contact.placeholders[8]} /></Field>
              <div className="rounded border border-dashed border-input bg-surface-container-low p-6 text-center text-sm text-muted-foreground"><Upload className="mx-auto mb-2 size-6" /> {contact.upload}</div>
              <div className="flex flex-wrap gap-3"><Button type="submit" className="flex-1"><Send className="size-4" /> {contact.submit}</Button><Button type="button" variant="outline">{contact.save}</Button></div>
            </form>
          </CardContent>
        </Card>
        <aside className="space-y-gutter lg:col-span-4">
          <InfoCard title={contact.hq} items={[...contact.hqItems]} icon="map" />
          <InfoCard title={contact.logistics} items={[...contact.logisticsItems]} icon="package" />
          <Card><CardContent><h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-primary">{contact.faq}</h3><div className="space-y-3 text-sm text-muted-foreground">{contact.faqItems.map((item) => <p key={item}>{item}</p>)}</div></CardContent></Card>
        </aside>
      </section>
    </main>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="grid gap-2 text-xs font-bold uppercase tracking-[0.05em]">{label}{children}</label>;
}

function InfoCard({ title, items, icon }: { title: string; items: string[]; icon: "map" | "package" }) {
  const Icon = icon === "map" ? MapPin : PackageCheck;
  return <Card><CardContent><Icon className="mb-4 size-6 text-primary" /><h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-primary">{title}</h3><div className="space-y-2 text-sm leading-6 text-muted-foreground">{items.map((item) => <p className="flex items-center gap-2" key={item}>{item.includes("@") ? <Mail className="size-4" /> : item.includes("support") ? <Phone className="size-4" /> : null}{item}</p>)}</div></CardContent></Card>;
}
