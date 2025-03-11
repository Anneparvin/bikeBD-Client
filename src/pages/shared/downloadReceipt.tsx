
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

type DownloadReceiptProps = {
    orderData: OrderData;
};

type OrderData = {
    order_id: string;
    currency: string;
    amount: number;
    bank_status: string;
    date_time: string;
    bank_trx_id: string;
    invoice_no: string;
    name: string;
    email: string;
    phone_no: string;
};


const styles = StyleSheet.create({
    page: {
        flexDirection: "column",
        backgroundColor: "#ffffff",
        padding: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
    },
    section: {
        marginBottom: 10,
    },
    label: {
        fontSize: 14,
        fontWeight: "bold",
        marginBottom: 5,
    },
    value: {
        fontSize: 12,
        marginBottom: 10,
    },
    footer: {
        marginTop: 20,
        textAlign: "center",
        fontSize: 10,
        color: "#666666",
    },
});


const DownloadRicipt = ({ orderData }: DownloadReceiptProps) => (
    <Document>
        <Page size="A4" style={styles.page}>

            <Text style={styles.header}>Order Receipt</Text>


            <View style={styles.section}>
                <Text style={styles.label}>Order ID:</Text>
                <Text style={styles.value}>{orderData?.order_id}</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.label}>Amount:</Text>
                <Text style={styles.value}>
                    {orderData?.currency} {orderData?.amount?.toFixed(2)}
                </Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.label}>Status:</Text>
                <Text style={styles.value}>{orderData?.bank_status}</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.label}>Date:</Text>
                <Text style={styles.value}>
                    {new Date(orderData?.date_time)?.toLocaleString()}
                </Text>
            </View>


            <View style={styles.section}>
                <Text style={styles.label}>Transaction ID:</Text>
                <Text style={styles.value}>{orderData?.bank_trx_id}</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.label}>Invoice No:</Text>
                <Text style={styles.value}>{orderData?.invoice_no}</Text>
            </View>


            <View style={styles.section}>
                <Text style={styles.label}>Name:</Text>
                <Text style={styles.value}>{orderData?.name}</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.label}>Email:</Text>
                <Text style={styles.value}>{orderData?.email}</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.label}>Phone:</Text>
                <Text style={styles.value}>{orderData?.phone_no}</Text>
            </View>


            <View style={styles.footer}>
                <Text>Thank you for your purchase!</Text>
            </View>
        </Page>
    </Document>
);

export default DownloadRicipt;