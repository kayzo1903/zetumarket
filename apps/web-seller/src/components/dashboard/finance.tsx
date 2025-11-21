"use client"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@seller/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@seller/components/ui/tabs";
import { Button } from "@seller/components/ui/button";
import { useTranslations } from "next-intl";

export default function Finance() {
  const t = useTranslations("Finance");

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              {t("total_revenue")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{t("currency")} 2,450,000</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              {t("pending_payout")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {t("currency")} 150,000
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="payouts" className="w-full">
        <TabsList>
          <TabsTrigger value="payouts">{t("tabs.payouts")}</TabsTrigger>
          <TabsTrigger value="history">{t("tabs.history")}</TabsTrigger>
        </TabsList>
        <TabsContent value="payouts" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>{t("payout_methods.title")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-red-500 rounded-full flex items-center justify-center text-white font-bold">
                    M
                  </div>
                  <div>
                    <p className="font-medium">{t("payout_methods.mpesa")}</p>
                    <p className="text-sm text-muted-foreground">**** 678</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  {t("payout_methods.edit")}
                </Button>
              </div>
              <Button className="w-full bg-green-400 h-14">
                {t("payout_methods.add_method")}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
