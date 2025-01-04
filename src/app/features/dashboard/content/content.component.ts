import { Component } from '@angular/core';
import { Order } from '../../../models/order';
import { OrderService } from '../../../core/services/order.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
})
export class ContentComponent {
  orders: Order[] = [];
  totalProfit: number = 0;
  totalPaidProfit: number = 0;
  totalUnpaidProfit: number = 0;

  constructor(private orderService: OrderService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders() {
    this.orderService.getOrders().subscribe({
      next: (response) => {
        this.orders = response;
        console.log(response);

        // After loading orders, calculate the profits
        this.calculateProfit();
      },
    });
  }

  calculateProfit() {
    this.totalPaidProfit = this.orders
      .filter((order) => order.paymentStatus === 'Paid')
      .reduce((sum, order) => sum + (order.subTotal || 0), 0);

    this.totalUnpaidProfit = this.orders
      .filter((order) => order.paymentStatus === 'Unpaid')
      .reduce((sum, order) => sum + (order.subTotal || 0), 0);

    // Calculate the total profit for all orders
    this.totalProfit = this.orders.reduce((sum, order) => sum + (order.subTotal || 0), 0);
  }

  updateOrderStatus(order: Order, newStatus: string) {
    order.orderStatus = newStatus;

    console.log(order);
    this.orderService.updateOrder(order).subscribe({
      next: () => {
        this.toastr.success('Order status updated successfully');
      },
    });
  }

  updatePaymentStatus(order: Order, newPaymentStatus: string) {
    order.paymentStatus = newPaymentStatus;
    console.log(order);

    this.orderService.updateOrder(order).subscribe({
      next: () => {
        this.toastr.success('Payment status updated successfully');
        this.calculateProfit();
      },
    });
  }

  selectedOrder:Order|null = null;
  isModalOpen = false;

  showOrderDetails(order: any): void {
    this.selectedOrder = order;
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.selectedOrder = null;
  }
}
