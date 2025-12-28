import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, Mail, Phone, Calendar, FileText, Users, TrendingUp, Eye, MousePointer } from "lucide-react";
import { format } from "date-fns";
import { it } from "date-fns/locale";

interface Lead {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  source: string | null;
  status: string | null;
  campaign_name: string | null;
  obiettivo: string | null;
  message: string | null;
  created_at: string;
}

interface EmailSequence {
  id: string;
  lead_id: string;
  sequence_type: string;
  email_subject: string;
  status: string | null;
  scheduled_at: string;
  sent_at: string | null;
  opened_at: string | null;
  clicked_at: string | null;
  open_count: number | null;
  click_count: number | null;
  lead?: { name: string; email: string | null };
}

interface Stats {
  totalLeads: number;
  leadMagnetLeads: number;
  contactFormLeads: number;
  emailsSent: number;
  emailsOpened: number;
  emailsClicked: number;
}

export default function LeadsDashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [emailSequences, setEmailSequences] = useState<EmailSequence[]>([]);
  const [stats, setStats] = useState<Stats>({
    totalLeads: 0,
    leadMagnetLeads: 0,
    contactFormLeads: 0,
    emailsSent: 0,
    emailsOpened: 0,
    emailsClicked: 0
  });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch leads
      const { data: leadsData, error: leadsError } = await supabase
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false });

      if (leadsError) throw leadsError;

      // Fetch email sequences with lead info
      const { data: sequencesData, error: sequencesError } = await supabase
        .from("email_sequences")
        .select("*, leads(name, email)")
        .order("created_at", { ascending: false });

      if (sequencesError) throw sequencesError;

      const typedLeads = (leadsData || []) as Lead[];
      const typedSequences = (sequencesData || []).map((seq: any) => ({
        ...seq,
        lead: seq.leads
      })) as EmailSequence[];

      setLeads(typedLeads);
      setEmailSequences(typedSequences);

      // Calculate stats
      const leadMagnet = typedLeads.filter(l => l.campaign_name?.toLowerCase().includes("lead magnet") || l.source === "lead_magnet");
      const contactForm = typedLeads.filter(l => l.source === "website" || l.campaign_name?.toLowerCase().includes("contact"));
      const sentEmails = typedSequences.filter(e => e.status === "sent");
      const openedEmails = typedSequences.filter(e => e.opened_at !== null);
      const clickedEmails = typedSequences.filter(e => e.clicked_at !== null);

      setStats({
        totalLeads: typedLeads.length,
        leadMagnetLeads: leadMagnet.length,
        contactFormLeads: contactForm.length,
        emailsSent: sentEmails.length,
        emailsOpened: openedEmails.length,
        emailsClicked: clickedEmails.length
      });

    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string | null) => {
    const statusMap: Record<string, { variant: "default" | "secondary" | "destructive" | "outline"; label: string }> = {
      new: { variant: "default", label: "Nuovo" },
      contacted: { variant: "secondary", label: "Contattato" },
      qualified: { variant: "outline", label: "Qualificato" },
      converted: { variant: "default", label: "Convertito" },
      sent: { variant: "default", label: "Inviata" },
      pending: { variant: "secondary", label: "In attesa" },
      failed: { variant: "destructive", label: "Fallita" }
    };
    const config = statusMap[status || "new"] || statusMap.new;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "-";
    return format(new Date(dateStr), "dd MMM yyyy HH:mm", { locale: it });
  };

  const openRate = stats.emailsSent > 0 ? ((stats.emailsOpened / stats.emailsSent) * 100).toFixed(1) : "0";
  const clickRate = stats.emailsOpened > 0 ? ((stats.emailsClicked / stats.emailsOpened) * 100).toFixed(1) : "0";

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Dashboard Leads</h1>
          <p className="text-muted-foreground mt-1">Gestione lead e analytics email</p>
        </div>
        <Button onClick={fetchData} variant="outline">
          Aggiorna
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Totale Lead
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.totalLeads}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Lead Magnet
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-primary">{stats.leadMagnetLeads}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Modulo Contatti
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.contactFormLeads}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Email Inviate
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.emailsSent}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              Tasso Apertura
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600">{openRate}%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2">
              <MousePointer className="h-4 w-4" />
              Tasso Click
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-blue-600">{clickRate}%</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Tutti i Lead</TabsTrigger>
          <TabsTrigger value="lead-magnet">Lead Magnet</TabsTrigger>
          <TabsTrigger value="contacts">Modulo Contatti</TabsTrigger>
          <TabsTrigger value="emails">Sequenze Email</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Tutti i Lead</CardTitle>
              <CardDescription>Lista completa di tutti i lead acquisiti</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Telefono</TableHead>
                    <TableHead>Fonte</TableHead>
                    <TableHead>Campagna</TableHead>
                    <TableHead>Stato</TableHead>
                    <TableHead>Data</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leads.map((lead) => (
                    <TableRow key={lead.id}>
                      <TableCell className="font-medium">{lead.name}</TableCell>
                      <TableCell>{lead.email || "-"}</TableCell>
                      <TableCell>{lead.phone || "-"}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{lead.source || "website"}</Badge>
                      </TableCell>
                      <TableCell>{lead.campaign_name || "-"}</TableCell>
                      <TableCell>{getStatusBadge(lead.status)}</TableCell>
                      <TableCell>{formatDate(lead.created_at)}</TableCell>
                    </TableRow>
                  ))}
                  {leads.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                        Nessun lead trovato
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="lead-magnet">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="h-5 w-5" />
                Lead da Lead Magnet
              </CardTitle>
              <CardDescription>Lead che hanno scaricato la guida gratuita</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Telefono</TableHead>
                    <TableHead>Obiettivo</TableHead>
                    <TableHead>Stato</TableHead>
                    <TableHead>Data Download</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leads
                    .filter(l => l.campaign_name?.toLowerCase().includes("lead magnet") || l.source === "lead_magnet")
                    .map((lead) => (
                      <TableRow key={lead.id}>
                        <TableCell className="font-medium">{lead.name}</TableCell>
                        <TableCell>{lead.email || "-"}</TableCell>
                        <TableCell>{lead.phone || "-"}</TableCell>
                        <TableCell>{lead.obiettivo || "-"}</TableCell>
                        <TableCell>{getStatusBadge(lead.status)}</TableCell>
                        <TableCell>{formatDate(lead.created_at)}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contacts">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Lead da Modulo Contatti
              </CardTitle>
              <CardDescription>Lead che hanno compilato il modulo contatti</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Telefono</TableHead>
                    <TableHead>Messaggio</TableHead>
                    <TableHead>Stato</TableHead>
                    <TableHead>Data</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leads
                    .filter(l => l.source === "website" || l.campaign_name?.toLowerCase().includes("contact"))
                    .map((lead) => (
                      <TableRow key={lead.id}>
                        <TableCell className="font-medium">{lead.name}</TableCell>
                        <TableCell>{lead.email || "-"}</TableCell>
                        <TableCell>{lead.phone || "-"}</TableCell>
                        <TableCell className="max-w-xs truncate">{lead.message || "-"}</TableCell>
                        <TableCell>{getStatusBadge(lead.status)}</TableCell>
                        <TableCell>{formatDate(lead.created_at)}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="emails">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Sequenze Email Follow-up
              </CardTitle>
              <CardDescription>Tracking aperture e click delle email automatiche</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Lead</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Oggetto</TableHead>
                    <TableHead>Stato</TableHead>
                    <TableHead>Pianificata</TableHead>
                    <TableHead>Inviata</TableHead>
                    <TableHead>Aperta</TableHead>
                    <TableHead>Click</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {emailSequences.map((email) => (
                    <TableRow key={email.id}>
                      <TableCell className="font-medium">{email.lead?.name || "-"}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{email.sequence_type}</Badge>
                      </TableCell>
                      <TableCell className="max-w-xs truncate">{email.email_subject}</TableCell>
                      <TableCell>{getStatusBadge(email.status)}</TableCell>
                      <TableCell>{formatDate(email.scheduled_at)}</TableCell>
                      <TableCell>{formatDate(email.sent_at)}</TableCell>
                      <TableCell>
                        {email.opened_at ? (
                          <span className="text-green-600 flex items-center gap-1">
                            <Eye className="h-4 w-4" />
                            {formatDate(email.opened_at)}
                          </span>
                        ) : "-"}
                      </TableCell>
                      <TableCell>
                        {email.clicked_at ? (
                          <span className="text-blue-600 flex items-center gap-1">
                            <MousePointer className="h-4 w-4" />
                            {formatDate(email.clicked_at)}
                          </span>
                        ) : "-"}
                      </TableCell>
                    </TableRow>
                  ))}
                  {emailSequences.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                        Nessuna email in sequenza
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
