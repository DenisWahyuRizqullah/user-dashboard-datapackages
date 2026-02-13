import { useEffect, useState } from "react";
import { Button, Modal, Form, Select, Table, Space, Popconfirm, message, DatePicker } from "antd";
import TopNav from "../components/TopNav";
import {
  getTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
  getCustomers,
  getPackages,
} from "../services/transactionService";
import { formatTransactionDate } from "../services/dashboardService";
import "./Transactions.css";

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [form] = Form.useForm();

  const fetchAllData = async () => {
    try {
      setLoading(true);
      const [transRes, custRes, pkgRes] = await Promise.all([
        getTransactions(),
        getCustomers(),
        getPackages(),
      ]);

      setTransactions(transRes.data || []);
      setCustomers(custRes.data || []);
      setPackages(pkgRes.data || []);
    } catch {
      message.error("Gagal mengambil data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const openCreateModal = () => {
    setEditingTransaction(null);
    form.resetFields();
    setModalVisible(true);
  };

  const openEditModal = (record) => {
    setEditingTransaction(record);
    form.setFieldsValue({
      customerId: record.customerId,
      packageId: record.packageId,
      transactionDate: record.transactionDate,
    });
    setModalVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteTransaction(id);
      message.success("Transaksi berhasil dihapus");
      fetchAllData();
    } catch {
      message.error("Gagal menghapus transaksi");
    }
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setModalLoading(true);

      const payload = {
        customerId: values.customerId,
        packageId: values.packageId,
        transactionDate: values.transactionDate,
      };

      if (editingTransaction) {
        await updateTransaction(editingTransaction.id, payload);
        message.success("Transaksi berhasil diperbarui");
      } else {
        await createTransaction(payload);
        message.success("Transaksi baru berhasil ditambahkan");
      }

      setModalVisible(false);
      fetchAllData();
    } catch (error) {
      if (error?.errorFields) {
        return;
      }
      message.error("Gagal menyimpan transaksi");
    } finally {
      setModalLoading(false);
    }
  };

  const getCustomerName = (customerId) => {
    const customer = customers.find((c) => c.id === customerId);
    return customer?.name || "-";
  };

  const getPackageInfo = (packageId) => {
    const pkg = packages.find((p) => p.id === packageId);
    return pkg ? { name: pkg.name, price: pkg.price } : { name: "-", price: "-" };
  };

  const columns = [
    {
      title: "Nama Customer",
      dataIndex: "customerId",
      key: "customerId",
      render: (customerId) => getCustomerName(customerId),
    },
    {
      title: "Paket",
      dataIndex: "packageId",
      key: "packageId",
      render: (packageId) => getPackageInfo(packageId).name,
    },
    {
      title: "Harga",
      dataIndex: "packageId",
      key: "price",
      render: (packageId) => {
        const price = getPackageInfo(packageId).price;
        return typeof price === "number" ? `Rp ${price.toLocaleString("id-ID")}` : price;
      },
    },
    {
      title: "Tanggal Transaksi",
      dataIndex: "transactionDate",
      key: "transactionDate",
      render: (date) => formatTransactionDate(date),
    },
    {
      title: "Aksi",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button type="link" onClick={() => openEditModal(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Hapus transaksi"
            description="Apakah Anda yakin ingin menghapus transaksi ini?"
            okText="Ya"
            cancelText="Batal"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button type="link" danger>
              Hapus
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="transactions-page">
      <TopNav />

      <div className="transactions-content">
        <div className="transactions-header">
          <div>
            <h1>Transaksi</h1>
            <p>Kelola data transaksi (lihat, tambah, ubah, dan hapus).</p>
          </div>
          <Button type="primary" className="add-transaction-button" onClick={openCreateModal}>
            Tambah Transaksi
          </Button>
        </div>

        <Table
          rowKey="id"
          columns={columns}
          dataSource={transactions}
          loading={loading}
          pagination={{ pageSize: 5 }}
        />
      </div>

      <Modal
        title={editingTransaction ? "Edit Transaksi" : "Tambah Transaksi"}
        open={modalVisible}
        confirmLoading={modalLoading}
        onOk={handleSubmit}
        onCancel={() => setModalVisible(false)}
        okText="Simpan"
        cancelText="Batal"
        destroyOnClose
      >
        <Form form={form} layout="vertical" preserve={false}>
          <Form.Item
            label="Customer"
            name="customerId"
            rules={[{ required: true, message: "Customer wajib dipilih" }]}
          >
            <Select placeholder="Pilih customer">
              {customers.map((customer) => (
                <Select.Option key={customer.id} value={customer.id}>
                  {customer.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Paket"
            name="packageId"
            rules={[{ required: true, message: "Paket wajib dipilih" }]}
          >
            <Select placeholder="Pilih paket">
              {packages.map((pkg) => (
                <Select.Option key={pkg.id} value={pkg.id}>
                  {pkg.name} - Rp {pkg.price.toLocaleString("id-ID")}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Tanggal Transaksi"
            name="transactionDate"
            rules={[{ required: true, message: "Tanggal transaksi wajib diisi" }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default Transactions;
